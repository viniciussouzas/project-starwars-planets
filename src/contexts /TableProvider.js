import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAPIData = async () => {
    const response = await fetch('https://swapi.dev/api/planets');

    const apiData = await response.json();

    return apiData.results;
  };

  useEffect(() => {
    setLoading(true);

    const fetchResults = async () => {
      const results = await fetchAPIData();
      setData(results);
      setLoading(false);
    };
    fetchResults();
  }, []);

  const values = { data, loading };

  return (
    <TableContext.Provider value={ values }>
      {children}
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default TableProvider;
