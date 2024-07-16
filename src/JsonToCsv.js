import React, { useState } from 'react';
import { parse } from 'json2csv';
import './JsonToCsv.css'; // Import the CSS file

const JsonToCsv = () => {
  const [csvData, setCsvData] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileContent = await file.text();
      const jsonData = JSON.parse(fileContent);
      const csv = parse(jsonData);
      setCsvData(csv);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Convert JSON to CSV</h1>
      <input 
        type="file" 
        accept=".json" 
        onChange={handleFileUpload} 
        className="fileInput"
      />
      {csvData && (
        <div className="dashboardContainer">
          <div className="dashboardHeader">
            <h2 className="dashboardTitle">CSV Data</h2>
          </div>
          <div className="dashboardContent">
            <div className="csvTable">
              <table className="table">
                <thead>
                  <tr>
                    {csvData.headers.map((header, index) => (
                      <th key={index}>{header.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.data.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, index) => (
                        <td key={index}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JsonToCsv;
