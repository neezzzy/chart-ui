import React, { useEffect, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";



const initialNodes = [
  { id: "1", data: { label: "-" }, position: { x: 100, y: 100 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 200 } },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
const defaultViewport = { x: 0, y: 0, zoom: 1 };

const UpdateNode = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [nodeName, setNodeName] = useState("type your prompt here");
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "1") {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }
        if (node.id === "2") {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }

        return node;
      })
    );
  }, [nodeName, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "1") {
          // when you update a simple type you can just update the value
        }

        return node;
      })
    );
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === "e1-2") {
          return edge;
        }

        return edge;
      })
    );
  }, [setNodes, setEdges]);

  return (
    <div style={{ width: 500, height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultViewport={defaultViewport}
        minZoom={0.2}
        maxZoom={4}
        attributionPosition="bottom-left"
      >
        <div className="updatenode__controls">
          <label>label:</label>
          <input
            value={nodeName}
            onChange={(evt) => setNodeName(evt.target.value)}
          />
        </div>
      </ReactFlow>
    </div>
  );
};

export default UpdateNode;
