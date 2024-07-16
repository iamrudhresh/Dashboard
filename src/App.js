import React from 'react';
import JsonToCsv from './JsonToCsv';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CSV Converter Dashboard</h1>
      </header>
      <main className="App-main">
        <JsonToCsv />
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
