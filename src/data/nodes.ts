import { Node } from 'reactflow';

const defaultNodeStyle = {
  border: "3px solid #ff0071",
  background: "white",
  borderRadius: 20,
};

export default [
  {
    id: "1",
    type: "custom",
    style: defaultNodeStyle,
    position: { x: 0, y: 0 },
    data: { text: "" },
  },
  {
    id: "2",
    type: "custom",
    style: defaultNodeStyle,
    position: { x: 0, y: 100 },
    data: { text: "" },
  },
] as Node[];