// src/App.js

import React from 'react';
import CSVReader from './components/CSVReader';
import { Container } from '@mui/material';

const App = () => {
  return (
    <Container>
      <h1>CSV Reader</h1>
      <CSVReader />
    </Container>
  );
};

export default App;
