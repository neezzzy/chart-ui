import { Node } from "reactflow";

const initialNodeStyle = {
  border: "3px solid #ff0071",
  background: "white",
  borderRadius: 20,
};

export default [
  {
    id: "1",
    type: "custom",
    style: initialNodeStyle,
    position: { x: 0, y: 0 },
    data: { text: "" },
  },
  {
    id: "2",
    type: "custom",
    style: initialNodeStyle,
    position: { x: 0, y: 100 },
    data: { text: "" },
  },
] as Node[];
