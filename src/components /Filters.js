import { useContext, useEffect, useState } from 'react';
import TableContext from '../contexts/TableContext';
import Table from './Table';

function Filters() {
  const [inputName, setInputName] = useState('');
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');
  const [filteredData, setFilteredData] = useState([]);
  const [usedFilters, setUsedFilters] = useState([]);
  const [columnClasses, setColumnClasses] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water', '']);

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
    {
      usedColumn: filterColumn,
      usedComparison: filterComparison,
      usedValue: filterValue,
    },
  ]);

  const handleFilters = () => {
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

  const removeFilter = (filterIndex, type) => {
    const currFilters = [...usedFilters
      .filter((_item, index) => index !== filterIndex)];
    setUsedFilters([...currFilters]);

    const classes = ['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water', ''];

    let unsortedClasses = [...columnClasses, type];

    const sortedClassesArr = [];

    classes.forEach((item) => {
      const sortedClasses = unsortedClasses.filter((item2) => item2 === item);
      sortedClassesArr.push(...sortedClasses);
      unsortedClasses = unsortedClasses.filter((item3) => item3 !== item);
    });

    sortedClassesArr.push(...unsortedClasses);
    setColumnClasses([...sortedClassesArr]);
    setFilterColumn(sortedClassesArr[0]);
    let newFilteredData = [...data];
    currFilters.forEach((item) => {
      if (item.usedComparison === 'maior que') {
        newFilteredData = newFilteredData
          .filter((item2) => Number(item2[item.usedColumn] > Number(item.usedValue)));
      }
      if (item.usedComparison === 'menor que') {
        newFilteredData = newFilteredData
          .filter((item2) => Number(item2[filterColumn] < Number(filterValue)));
      }
      if (item.usedComparison === 'igual a') {
        newFilteredData = newFilteredData
          .filter((item2) => Number(item2[filterColumn] === Number(filterValue)));
      }
    });
    setFilteredData([...newFilteredData]);
  };

  const removeAllFilters = () => {
    setFilteredData([...data]);
    setColumnClasses(['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water', '']);
    setUsedFilters([]);
  };

  useEffect(() => {
    if (usedFilters.some((item) => item.usedColumn === filterColumn)) {
      setColumnClasses((prevClasses) => prevClasses
        .filter((item) => item !== filterColumn));
      setFilterColumn(columnClasses[0]);
    }
  }, [usedFilters, filterColumn, columnClasses]);

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
            { !usedFilters.some((item) => item
              .usedColumn === 'population')
              && <option value="population">population</option> }
            { !usedFilters.some((item) => item
              .usedColumn === 'orbital_period')
              && <option value="orbital_period">orbital_period</option> }
            { !usedFilters.some((item) => item
              .usedColumn === 'diameter')
              && <option value="diameter">diameter</option> }
            { !usedFilters.some((item) => item
              .usedColumn === 'rotation_period')
              && <option value="rotation_period">rotation_period</option> }
            { !usedFilters.some((item) => item
              .usedColumn === 'surface_water')
              && <option value="surface_water">surface_water</option> }
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
        <button
          type="button"
          onClick={ removeAllFilters }
          data-testid="button-remove-filters"
        >
          Remover Filtros
        </button>
      </form>
      {usedFilters.length > 0 && (
        usedFilters.map((item, index) => (
          <div
            key={ index }
            data-testid="filter"
          >
            <p>{`${item.usedColumn} ${item.usedComparison} ${item.usedValue}`}</p>
            <button
              onClick={ () => removeFilter(index, item.usedColumn) }
            >
              Remover
            </button>
          </div>
        ))
      )}
      <Table filteredData={ filteredData } inputName={ inputName } />
    </main>
  );
}

export default Filters;
