import { Handle, NodeProps, Position, NodeResizer } from "reactflow";
import useStore, { NodeData } from "../store";

function CustomNode({ id, data, selected }: NodeProps<NodeData>) {
  const updateNodeText = useStore((state) => state.updateNodeText);

  const inputContainerStyle = {
    minHeight: 20,
    width: "100%",
    border: "none",
    fontSize: 10,
    textAlign: "center",
    outline: "none",
    color: "#fff",
    backgroundColor: "transparent",
  };
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div>
        <input
          style={inputContainerStyle}
          type="text"
          placeholder="Enter text"
          defaultValue={data.text}
          onChange={(evt) => updateNodeText(id, evt.target.value)}
          className="nodrag"
        />
      </div>
      <NodeResizer
        color="#000000"
        isVisible={selected}
        minWidth={150}
        minHeight={30}
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default CustomNode;
