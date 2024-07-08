import React, { useState } from 'react';

function DataTable({ data, columns }) {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (column, value) => {
    setFilters({
      ...filters,
      [column]: value,
    });
  };

  const filteredData = data.filter((row) =>
    columns.every((column) => {
      if (!filters[column]) return true;
      const value = row[column];
      const filter = filters[column];
      if (typeof value === 'number') {
        return value >= filter.min && value <= filter.max;
      }
      return value.includes(filter);
    })
  );

  const getColumnType = (column) => {
    const value = data[0][column];
    return typeof value;
  };

  return (
    <div>
      {columns.map((column) => (
        <div key={column}>
          <label>{column}</label>
          {getColumnType(column) === 'number' ? (
            <div>
              <input
                type="number"
                placeholder="Min"
                onChange={(e) =>
                  handleFilterChange(column, {
                    ...filters[column],
                    min: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Max"
                onChange={(e) =>
                  handleFilterChange(column, {
                    ...filters[column],
                    max: e.target.value,
                  })
                }
              />
            </div>
          ) : (
            <input
              type="text"
              placeholder={`Filter ${column}`}
              onChange={(e) =>
                handleFilterChange(column, e.target.value)
              }
            />
          )}
        </div>
      ))}
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
