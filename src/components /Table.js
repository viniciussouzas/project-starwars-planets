import { useContext, useEffect, useState } from 'react';
import TableContext from '../contexts /TableContext';

function Table() {
  const [inputName, setInputName] = useState('');
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');
  const [filteredData, setFilteredData] = useState([]);
  const [usedFilters, setUsedFilters] = useState([]);

  const { data } = useContext(TableContext);

  useEffect(() => {
    setFilteredData([...data]);
  }, [data]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    switch (name) {
    case 'inputName':
      return setInputName(value);
    case 'filterColumn':
      return setFilterColumn(value);
    case 'filterComparison':
      return setFilterComparison(value);
    case 'filterValue':
      return setFilterValue(value);
    default:
    }
  };

  const handleUsedFilters = () => setUsedFilters((filters) => [...filters,
    `${filterColumn} ${filterComparison} ${filterValue}`]);

  // const handleUsedFilters = () => {
  //   switch (filterComparison) {
  //   case 'maior que':
  //     return setUsedFilters((filters) => [...filters,
  //       `${filterColumn} ${filterComparison} ${filterValue}`]);
  //   case 'menor que':
  //     return setUsedFilters((filters) => [...filters,
  //       `${filterColumn} menor que ${filterValue}`]);
  //   case 'igual a':
  //     return setUsedFilters((filters) => [...filters,
  //       `${filterColumn} igual a ${filterValue}`]);
  //   default:
  //   }
  // };

  const handleFilters = () => {
    // handleUsedFilters();

    if (usedFilters.length === 0) {
      switch (filterComparison) {
      case 'maior que':
        return (
          setFilteredData(data
            .filter((item) => Number(item[filterColumn]) > Number(filterValue))));
      case 'menor que':
        return (setFilteredData(data
          .filter((item) => Number(item[filterColumn]) < Number(filterValue))));
      case 'igual a':
        return (setFilteredData(data
          .filter((item) => Number(item[filterColumn]) === Number(filterValue))));
      default:
      }
    } else {
      switch (filterComparison) {
      case 'maior que':
        return (
          setFilteredData((previousData) => previousData
            .filter((item) => Number(item[filterColumn]) > Number(filterValue))));
      case 'menor que':
        return (
          setFilteredData((previousData) => previousData
            .filter((item) => Number(item[filterColumn]) < Number(filterValue))));
      case 'igual a':
        return (
          setFilteredData((previousData) => previousData
            .filter((item) => Number(item[filterColumn]) === Number(filterValue))));
      default:
      }
    }
  };

  return (
    <main>
      <form>
        <input
          name="inputName"
          type="text"
          value={ inputName }
          onChange={ handleChange }
          data-testid="name-filter"
          placeholder="Planet search"
        />
        <label htmlFor="column-filter">
          Columns:
          <select
            name="filterColumn"
            value={ filterColumn }
            onChange={ handleChange }
            data-testid="column-filter"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Comparisons:
          <select
            name="filterComparison"
            value={ filterComparison }
            onChange={ handleChange }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          Value:
          <input
            name="filterValue"
            type="number"
            value={ filterValue }
            onChange={ handleChange }
            data-testid="value-filter"
          />
        </label>
        <button
          type="button"
          onClick={ () => {
            handleUsedFilters();
            handleFilters();
          } }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      {usedFilters.length > 0 && (
        usedFilters.map((item, index) => (
          <div
            key={ index }
            data-testid="filter"
          >
            <p>{item}</p>
          </div>
        ))
      )}
      {data !== null && (
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>rotation_period</th>
              <th>orbital_period</th>
              <th>diameter</th>
              <th>climate</th>
              <th>gravity</th>
              <th>terrain</th>
              <th>surface</th>
              <th>population</th>
              <th>films</th>
              <th>created</th>
              <th>edited</th>
              <th>url</th>
            </tr>
          </thead>
          <tbody>
            { filteredData
              .filter((item) => item.name.toLowerCase().includes(inputName.toLowerCase()))
              .map((item) => (
                <tr key={ item.orbital_period }>
                  <td>{item.name}</td>
                  <td>{item.rotation_period}</td>
                  <td>{item.orbital_period}</td>
                  <td>{item.diameter}</td>
                  <td>{item.climate}</td>
                  <td>{item.gravity}</td>
                  <td>{item.terrain}</td>
                  <td>{item.surface_water}</td>
                  <td>{item.population}</td>
                  <td>{item.films.map((film, index) => <p key={ index }>{film}</p>)}</td>
                  <td>{item.created}</td>
                  <td>{item.edited}</td>
                  <td>{item.url}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default Table;
