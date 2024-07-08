import React, { useState } from 'react';
import { parse } from 'papaparse';
import DataTable from './DataTable';

function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    parse(file, {
      complete: (result) => {
        const parsedData = result.data;
        setColumns(Object.keys(parsedData[0]));
        setData(parsedData);
      },
      header: true,
    });
  };

  return (
    <div>
      <h1>CSV Reader</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {data.length > 0 && (
        <DataTable data={data} columns={columns} />
      )}
    </div>
  );
}

export default App;
