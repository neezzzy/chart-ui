import React, { useState } from "react";
import "./QueryComponent.css"; // Import the CSS file for styling
import OpenAiChain from "../util/OpenAiChain";

const QueryComponent = ({ addNode }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("Query submitted:", query);
    const result = await OpenAiChain(query);
    console.log("Response from OpenAiChain:", result);
    addNode(result);
    setQuery("");
  };

  return (
    <div className="query-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter your query"
        className="query-input"
      />
      <button onClick={handleSubmit} className="query-button">
        Send
      </button>
    </div>
  );
};

export default QueryComponent;
