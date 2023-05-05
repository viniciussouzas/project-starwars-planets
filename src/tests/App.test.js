import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import TableProvider from '../contexts/TableProvider';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

describe('Testes da aplicação', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(testData)
    });
  });

  test('Verifica se os elementos iniciais estão sendo renderizados na tela', async () => {
    render(
      <TableProvider>
        <App/>
      </TableProvider>
    );

    const title = screen.getByRole('heading', {
      name: /star wars/i,
      level: 1,
    });
    expect(title).toBeInTheDocument();

    const loading = screen.getByText(/carregando.../i);
    expect(loading).toBeInTheDocument();

    const inputName = await screen.findByTestId('name-filter');
    expect(inputName).toBeInTheDocument();

    const filterColumn = await screen.findByTestId('column-filter');
    expect(filterColumn).toBeInTheDocument();

    const filterComparison = await screen.findByTestId('comparison-filter');
    expect(filterComparison).toBeInTheDocument();

    const filterValue = await screen.findByTestId('value-filter');
    expect(filterValue).toBeInTheDocument();

    const filterButton = await screen.findByTestId('button-filter');
    expect(filterButton).toBeInTheDocument();

    const tableCell = await screen.findByRole('cell', {
      name: /tatooine/i,
    });
    expect(tableCell).toBeInTheDocument();
    });

    test('Verifica se os filtros estão funcionando corretamente', async () => {
      render(
        <TableProvider>
          <App/>
        </TableProvider>
      );

      const inputName = await screen.findByTestId('name-filter');

      const table = await screen.findAllByRole('cell');
      expect(table).toHaveLength(130);

      userEvent.type(inputName, 'al');
      expect(inputName).toHaveValue('al');

      await waitFor(() => {
        const tableCell = screen.getByRole('cell', {
          name: /alderaan/i,
        });
        expect(tableCell).toBeInTheDocument();
      })

      userEvent.clear(inputName);
      const tattoineCell = screen.getByRole('cell', {
        name: /tatooine/i,
      });
      expect(tattoineCell).toBeInTheDocument();

      const filterColumn = await screen.findByTestId('column-filter');
      const filterComparison = await screen.findByTestId('comparison-filter');
      const filterValue = await screen.findByTestId('value-filter');
      const filterButton = await screen.findByTestId('button-filter');
      const btnRemoveAll = await screen.findByTestId('button-remove-filters');

      const btnRemoveFilter = screen.queryByRole('button', {
        name: /remove filter/i,
      });
      expect(btnRemoveFilter).not.toBeInTheDocument();

      userEvent.selectOptions(filterColumn, 'diameter');
      expect(filterColumn).toHaveValue('diameter');

      userEvent.selectOptions(filterComparison, 'maior que');
      expect(filterComparison).toHaveValue('maior que');
      
      userEvent.clear(filterValue);
      userEvent.type(filterValue, '10000')
      expect(filterValue).toHaveValue(10000);

      userEvent.click(filterButton);

      await waitFor(() => {
        const table = screen.getAllByRole('cell');
        expect(table).toHaveLength(91);

        const tatooineCell = screen.getByRole('cell', {
          name: /tatooine/i,
        });
        expect(tatooineCell).toBeInTheDocument();

        const alderaanCell = screen.getByRole('cell', {
          name: /alderaan/i,
        });
        expect(alderaanCell).toBeInTheDocument();

        const yavinCell = screen.getByRole('cell', {
          name: /yavin/i,
        });
        expect(yavinCell).toBeInTheDocument();

        const usedFilters = screen.getByTestId('filter');
        expect(usedFilters).toHaveTextContent('diameter maior que 10000');

        const btnRemoveFilter = screen.getByRole('button', {
          name: 'Remove Filter',
        });
        expect(btnRemoveFilter).toBeInTheDocument();
  
        userEvent.click(btnRemoveFilter);
  
        const filtersUsed = screen.queryByTestId('filter');
        expect(filtersUsed).not.toBeInTheDocument();
      });

      expect(filterColumn.children).toHaveLength(5);

      userEvent.selectOptions(filterColumn, 'surface_water');
      expect(filterColumn).toHaveValue('surface_water');

      userEvent.selectOptions(filterComparison, 'menor que')
      expect(filterComparison).toHaveValue('menor que');

      userEvent.clear(filterValue);
      userEvent.type(filterValue, '50')
      expect(filterValue).toHaveValue(50);

      userEvent.click(filterButton);

      userEvent.selectOptions(filterColumn, 'rotation_period');
      expect(filterColumn).toHaveValue('rotation_period');

      userEvent.selectOptions(filterComparison, 'menor que');
      expect(filterComparison).toHaveValue('menor que');


      userEvent.clear(filterValue);
      userEvent.type(filterValue, '15')
      expect(filterValue).toHaveValue(15);

      userEvent.click(filterButton);

      await waitFor(() => {
        const table = screen.getAllByRole('cell');
        expect(table).toHaveLength(13);

        const bespinCell = screen.getByRole('cell', {
          name: /bespin/i,
        });
        expect(bespinCell).toBeInTheDocument();

        expect(filterColumn.children).toHaveLength(3);
      });

      userEvent.click(btnRemoveAll);

      await waitFor(() => {
        const table = screen.getAllByRole('cell');
      expect(table).toHaveLength(130);
      });
    });
  });
