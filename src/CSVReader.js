// src/components/CSVReader.js

import React, { useState } from 'react';
import Papa from 'papaparse';
import { TextField, Button, Box, Grid } from '@mui/material';

const CSVReader = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setData(results.data);
        initializeFilters(results.data);
      },
    });
  };

  const initializeFilters = (data) => {
    const initialFilters = {};
    data.forEach(row => {
      Object.keys(row).forEach(column => {
        if (!initialFilters[column]) {
          initialFilters[column] = {
            min: Number.MAX_VALUE,
            max: Number.MIN_VALUE,
            type: typeof row[column]
          };
        }
        if (typeof row[column] === 'number') {
          if (row[column] < initialFilters[column].min) initialFilters[column].min = row[column];
          if (row[column] > initialFilters[column].max) initialFilters[column].max = row[column];
        }
      });
    });
    setFilters(initialFilters);
  };

  const handleFilterChange = (e, column) => {
    setFilters({
      ...filters,
      [column]: {
        ...filters[column],
        value: e.target.value,
      },
    });
  };

  const filterData = () => {
    return data.filter(row => {
      return Object.keys(filters).every(column => {
        if (filters[column].type === 'number') {
          const [min, max] = filters[column].value.split('-').map(Number);
          return row[column] >= min && row[column] <= max;
        } else {
          return row[column].toString().includes(filters[column].value);
        }
      });
    });
  };

  return (
    <Box p={2}>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {data.length > 0 && (
        <>
          <Box mt={2}>
            {Object.keys(filters).map((column, index) => (
              <TextField
                key={index}
                label={column}
                variant="outlined"
                margin="normal"
                onChange={(e) => handleFilterChange(e, column)}
                placeholder={filters[column].type === 'number' ? `${filters[column].min}-${filters[column].max}` : ''}
              />
            ))}
          </Box>
          <Grid container spacing={2}>
            {Object.keys(data[0]).map((column, index) => (
              <Grid item key={index} xs>
                <Box>{column}</Box>
              </Grid>
            ))}
            {filterData().map((row, rowIndex) => (
              <Grid container key={rowIndex} spacing={2}>
                {Object.keys(row).map((column, colIndex) => (
                  <Grid item key={colIndex} xs>
                    <Box>{row[column]}</Box>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default CSVReader;
