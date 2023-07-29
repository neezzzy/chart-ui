import React, { useState } from 'react';
import './QueryComponent.css'; // Import the CSS file for styling

const QueryComponent = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Query submitted:', query);
    setQuery('');
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
