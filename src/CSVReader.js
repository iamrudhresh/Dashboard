import React, { useState } from 'react';
import Papa from 'papaparse';

const CSVReader = () => {
    const [csvData, setCsvData] = useState([]);
    const [filters, setFilters] = useState({});
    const [dataTypes, setDataTypes] = useState({});

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            Papa.parse(file, {
                complete: (result) => {
                    const data = result.data;
                    const types = detectDataTypes(data);
                    setCsvData(data);
                    setDataTypes(types);
                    setFilters(initializeFilters(types));
                },
                header: true,
            });
        }
    };

    const detectDataTypes = (data) => {
        const types = {};
        const firstRow = data[0];
        for (const key in firstRow) {
            if (!isNaN(firstRow[key])) {
                types[key] = 'number';
            } else {
                types[key] = 'string';
            }
        }
        return types;
    };

    const initializeFilters = (types) => {
        const initialFilters = {};
        for (const key in types) {
            if (types[key] === 'number') {
                const values = csvData.map(row => parseFloat(row[key])).filter(value => !isNaN(value));
                initialFilters[key] = {
                    min: Math.min(...values),
                    max: Math.max(...values),
                    currentMin: Math.min(...values),
                    currentMax: Math.max(...values)
                };
            } else {
                initialFilters[key] = '';
            }
        }
        return initialFilters;
    };

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }));
    };

    const filterData = () => {
        return csvData.filter(row => {
            for (const key in filters) {
                if (dataTypes[key] === 'number') {
                    const value = parseFloat(row[key]);
                    if (value < filters[key].currentMin || value > filters[key].currentMax) {
                        return false;
                    }
                } else if (dataTypes[key] === 'string') {
                    if (!row[key].includes(filters[key])) {
                        return false;
                    }
                }
            }
            return true;
        });
    };

    const filteredData = filterData();

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            {Object.keys(filters).length > 0 && (
                <div className="filters">
                    {Object.keys(filters).map(key => (
                        <div key={key}>
                            {dataTypes[key] === 'number' ? (
                                <div>
                                    <label>{key}:</label>
                                    <input
                                        type="number"
                                        value={filters[key].currentMin}
                                        min={filters[key].min}
                                        max={filters[key].max}
                                        onChange={(e) => handleFilterChange(key, {
                                            ...filters[key],
                                            currentMin: parseFloat(e.target.value)
                                        })}
                                    />
                                    <input
                                        type="number"
                                        value={filters[key].currentMax}
                                        min={filters[key].min}
                                        max={filters[key].max}
                                        onChange={(e) => handleFilterChange(key, {
                                            ...filters[key],
                                            currentMax: parseFloat(e.target.value)
                                        })}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label>{key}:</label>
                                    <input
                                        type="text"
                                        value={filters[key]}
                                        onChange={(e) => handleFilterChange(key, e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {filteredData.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            {Object.keys(filteredData[0]).map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row, rowIndex) => (
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
