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
  Panel,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import "./App.css";
import TooltipNode from "./components/TooltipNode";
import CustomNode from "./components/CustomNode";
import useStore from "./store";
import { shallow } from "zustand/shallow";
import QueryComponent from "./components/QueryComponent";

const nodeTypes = {
  custom: CustomNode,
  tooltip: TooltipNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  deleteAllNodes: state.deleteAllNodes,
  addNode: state.addNode,
});

const App = () => {
  const defaultNodeStyle = {
    border: "1px solid #ff0071",
    background: "white",
    borderRadius: 20,
  };

  const generateUniqueId = () => {
    const timestamp = Date.now();
    return `node-${timestamp}`;
  };
  const reactFlowWrapper = useRef(null);
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    deleteAllNodes,
    addNode,
  } = useStore(selector, shallow);

  const handleAddNode = useCallback((text: string) => {
    addNode({
      id: generateUniqueId(),
      position: {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 150),
      },
      type: "custom",
      data: { text: text },
      style: defaultNodeStyle,
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.target.tagName === "INPUT") {
        // when entering in QueryComponent or adding Node text
        return;
      }
      if (event.key === "n" || event.key === "N") {
        handleAddNode("");
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
      style={{ width: "100%", height: "100vh" }}
    >
      <QueryComponent addNode={handleAddNode} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls showZoom={false} showFitView={false} showInteractive={false}>
          <ControlButton
            onClick={() =>
              addNode({
                id: generateUniqueId(),
                position: {
                  x: Math.floor(Math.random() * 10),
                  y: Math.floor(Math.random() * 150),
                },
                type: "custom",
                data: { text: `` },
                style: defaultNodeStyle,
              })
            }
            className="button"
            title="action"
          >
            <div>press "N" to add node</div>
          </ControlButton>
          <ControlButton
            onClick={deleteAllNodes}
            className="button"
            title="action"
          >
            <div>delete all nodes</div>
          </ControlButton>
        </Controls>
        <MiniMap />
        <Background size={1} lineWidth={0.5} />
      </ReactFlow>
    </div>
  );
};

export default App;
