import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

import initialNodes from "./data/nodes";
import initialEdges from "./data/edges";

export type NodeData = {
  text: string;
};

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNodeText: (nodeId: string, text: string) => void;
  deleteAllNodes: () => void;
  addNode: (node: Node) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  updateNodeText: (nodeId: string, text: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.data = { ...node.data, text };
        }

        return node;
      }),
    });
  },
  updateNodeBackground: (nodeId: string, bg: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          node.style = { ...node.style, backgroundColor: bg };
        }

        return node;
      }),
    });
  },
  deleteAllNodes: () => {
    set({
      nodes: [],
      edges: [],
    });
  },
  addNode: (node: Node) => {
    console.log("addNode");
    console.log("node", node);
    set({
      nodes: [...get().nodes, node],
    });
  },
}));

export default useStore;
