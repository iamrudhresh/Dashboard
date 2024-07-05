// src/CSVReader.js
import React, { useState } from 'react';
import Papa from 'papaparse';

const CSVReader = () => {
    const [csvData, setCsvData] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            Papa.parse(file, {
                complete: (result) => {
                    setCsvData(result.data);
                },
                header: true,
            });
        }
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            {csvData.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            {Object.keys(csvData[0]).map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {csvData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {Object.values(row).map((value, cellIndex) => (
                                    <td key={cellIndex}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CSVReader;
