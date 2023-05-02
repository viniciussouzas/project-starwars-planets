import { useContext, useState } from 'react';
import TableContext from '../contexts /TableContext';

function Table() {
  const { data } = useContext(TableContext);

  const [inputName, setInputName] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;

    switch (name) {
    case 'inputName':
      return setInputName(value);
    default:
    }
  };

  return (
    <main>
      <input
        name="inputName"
        type="text"
        value={ inputName }
        onChange={ handleChange }
        data-testid="name-filter"
      />
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
            { data && data.filter((item) => item.name.toLowerCase().includes(inputName))
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
