import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  ControlButton,
  MiniMap,
  addEdge,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import "./App.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];



const App = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [prevNodePosition, setPrevNodePosition] = useState({ x: 0, y: 50 });

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const generateUniqueId = () => {
    const timestamp = Date.now();
    return `node-${timestamp}`;
  };

  const handleAddNode = useCallback(() => {
    if (prevNodePosition === null) {
      setPrevNodePosition({ x: 0, y: 50 });
    } else {
      const { x, y } = prevNodePosition;
      const id = generateUniqueId();

      const newNode = {
        id,
        position: { x, y: y + 50 },
        data: { label: `Node ${id}` },
      };

      setPrevNodePosition({ x, y: y + 50 });
      setNodes((nds) => nds.concat(newNode));
    }
  }, [prevNodePosition, setNodes]);

  const handleDeleteAllNodes = () => {
    setNodes([]);
    setEdges([]);
    setPrevNodePosition({ x: 0, y: 50 });
  };

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [setEdges, edges, nodes]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "n" || event.key === "N") {
        handleAddNode();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleAddNode]);

  return (
    <div
      className="wrapper"
      ref={reactFlowWrapper}
      style={{ width: "90vw", height: "90vh" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodesDelete={onNodesDelete}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls showZoom={false} showFitView={false} showInteractive={false}>
          <ControlButton
            className="button"
            onClick={handleAddNode}
            title="action"
          >
            <div>press "N" or add node</div>
          </ControlButton>
          <ControlButton
            className="button"
            onClick={handleDeleteAllNodes}
            title="action"
          >
            <div>delete all nodes</div>
          </ControlButton>
        </Controls>
        <MiniMap />
        <Background variant="dots"  size={1} lineWidth={1} color={'#ffff'}/>
      </ReactFlow>
    </div>
  );
};

export default App;
