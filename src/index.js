import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TableProvider from './contexts/TableProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <TableProvider>
      <App />
    </TableProvider>,
  );
