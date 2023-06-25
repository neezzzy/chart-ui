import { memo, useCallback } from "react";
import { Handle, Position, NodeToolbar, NodeResizer } from "reactflow";

const CustomNode = ({ data, selected }) => {
  const handleStyle = { backgroundColor: "#242624", borderRadius: 10 };
  const inputContainerStyle = {
    minHeight: 20,
    width: '100%',
    margin: 10,
    border: 'none', 
  };

  function TextUpdaterNode({ data }) {
    const onChange = useCallback((evt) => {
      console.log(evt.target.value);
    }, []);
    return (
      <>
        <NodeToolbar
          isVisible={data.toolbarVisible}
          position={data.toolbarPosition}
        >
          <button onClick={data.onDelete}>delete</button>
          <button>copy</button>
        </NodeToolbar>

        <input
          style={inputContainerStyle}
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag"
        />

        <NodeResizer
          color="#000000"
          isVisible={selected}
          minWidth={100}
          minHeight={30}
        />
        <Handle type="target" position={Position.Top} style={handleStyle} />
        <Handle type="source" position={Position.Bottom} style={handleStyle} />
      </>
    );
  }

  return (
    <TextUpdaterNode
      data={data}
      selected={selected}
      handleStyle={handleStyle}
    />
  );
};

export default memo(CustomNode);
