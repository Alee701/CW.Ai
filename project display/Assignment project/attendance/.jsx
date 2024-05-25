import React, { useState } from 'react';

function DataExport() {
  const [exportOption, setExportOption] = useState('');

  const handleExportChange = (event) => {
    setExportOption(event.target.value);
  };

  const handleExport = () => {
    // Call the backend API to export data based on the selected option
    fetch(`/export-data?type=${exportOption}`)
      .then(response => response.json())
      .then(data => {
        // Handle the data, e.g., download as a file
      });
  };

  return (
    <div>
      <h3>Select Export Option</h3>
      <label>
        <input
          type="radio"
          value="weekly"
          checked={exportOption === 'weekly'}
          onChange={handleExportChange}
        />
        Weekly
      </label>
      <label>
        <input
          type="radio"
          value="monthly"
          checked={exportOption === 'monthly'}
          onChange={handleExportChange}
        />
        Monthly
      </label>
      <button onClick={handleExport}>Export Data</button>
    </div>
  );
}

export default DataExport;
