import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Teste o componente FinishBtn', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });
  it('Teste se o botão é renderizado', async () => {
    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/meals');
    });

    await waitFor(() => {
      expect(global.fetch).toBeCalled();
    });

    const buttonIconSearch = screen.getByTestId('search-top-btn');

    userEvent.click(buttonIconSearch);

    const inputSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'Arrabiata');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    await waitFor(() => {
      expect(global.fetch).toBeCalled();
    });

    const btnStart = await screen.findByTestId('start-recipe-btn');
    userEvent.click(btnStart);

    const btnFinish = await screen.findByTestId('finish-recipe-btn');
    expect(btnFinish).toBeVisible();
    expect(btnFinish).toBeDisabled();

    const ingredients = await screen.findAllByRole('checkbox');
    expect(ingredients).toHaveLength(8);

    ingredients.forEach((ingredient) => userEvent.click(ingredient));

    expect(btnFinish).toBeEnabled();
  });
});
