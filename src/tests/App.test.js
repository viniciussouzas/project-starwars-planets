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
      })
    });
  });
