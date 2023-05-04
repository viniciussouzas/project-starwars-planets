import React, { useContext } from 'react';
import './App.css';
import Table from './components /Table';
import TableContext from './contexts/TableContext';

function App() {
  const { loading } = useContext(TableContext);
  return (
    <div>
      <h1>Star Wars Project</h1>
      { loading ? <p>Carregando...</p>
        : (
          <Table />
        )}
    </div>
  );
}

export default App;
