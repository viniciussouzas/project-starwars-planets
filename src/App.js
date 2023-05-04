import React, { useContext } from 'react';
import './App.css';
import Filters from './components /Filters';
import TableContext from './contexts/TableContext';

function App() {
  const { loading } = useContext(TableContext);
  return (
    <div>
      <h1>Star Wars Project</h1>
      { loading ? <p>Carregando...</p>
        : (
          <Filters />
        )}
    </div>
  );
}

export default App;
