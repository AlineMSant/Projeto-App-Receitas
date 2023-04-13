import React from 'react';
import { screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import fetch from '../../cypress/mocks/fetch';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Teste DoneRecipes', () => {
  // beforeEach(() => {
  //   global.fetch = jest.fn(fetch);
  // });
  const imgTestId = '0-horizontal-image';
  it('Teste se a page DoneRecipes é renderizada corretamente para meals', async () => {
    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/meals');
    });

    // await waitFor(() => {
    //   expect(global.fetch).toBeCalled();
    // });

    const buttonIconSearch = screen.getByTestId('search-top-btn');

    userEvent.click(buttonIconSearch);

    const inputSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'Arrabiata');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    // await waitFor(() => {
    //   expect(global.fetch).toBeCalled();
    // });

    const loading = await screen.findByText('Carregando...');
    waitForElementToBeRemoved(loading);

    const btnStart = await screen.findByRole('button', { name: 'Start Recipe' });
    userEvent.click(btnStart);

    const ingredients = await screen.findAllByRole('checkbox');

    expect(ingredients).toHaveLength(8);

    userEvent.click(ingredients[0]);
    userEvent.click(ingredients[1]);
    userEvent.click(ingredients[2]);
    userEvent.click(ingredients[3]);
    userEvent.click(ingredients[4]);
    userEvent.click(ingredients[5]);
    userEvent.click(ingredients[6]);
    userEvent.click(ingredients[7]);

    const btnFinish = screen.getByTestId('finish-recipe-btn');
    userEvent.click(btnFinish);

    const btnAll = await screen.findByTestId('filter-by-all-btn');
    const btnMeals = await screen.findByTestId('filter-by-meal-btn');
    const btnDrinks = await screen.findByTestId('filter-by-drink-btn');
    const img = await screen.findByTestId(imgTestId);
    const category = await screen.findByTestId('0-horizontal-top-text');
    const name = await screen.findByTestId('0-horizontal-name');
    const date = await screen.findByTestId('0-horizontal-done-date');
    const ingredient = await screen.findByTestId('0-Pasta-horizontal-tag');
    const btnShare = await screen.findByTestId('0-horizontal-share-btn');

    expect(btnAll).toBeVisible();
    expect(btnMeals).toBeVisible();
    expect(btnDrinks).toBeVisible();
    expect(img).toBeVisible();
    expect(category).toBeVisible();
    expect(name).toBeVisible();
    expect(date).toBeVisible();
    expect(ingredient).toBeVisible();
    expect(btnShare).toBeVisible();

    userEvent.click(btnDrinks);
    expect(img).not.toBeVisible();

    userEvent.click(btnMeals);
    const imgAfterClickMeals = await screen.findByTestId(imgTestId);
    expect(imgAfterClickMeals).toBeVisible();

    userEvent.click(btnAll);
    const imgAfterClickAll = await screen.findByTestId(imgTestId);
    expect(imgAfterClickAll).toBeVisible();
  });

  it('Teste se ao clicar na imagem é redirecionado corretamente', async () => {
    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/meals/52771/in-progress');
    });

    // await waitFor(() => {
    //   expect(global.fetch).toBeCalled();
    // });

    const ingredients = await screen.findAllByRole('checkbox');

    expect(ingredients).toHaveLength(8);

    userEvent.click(ingredients[0]);
    userEvent.click(ingredients[1]);
    userEvent.click(ingredients[2]);
    userEvent.click(ingredients[3]);
    userEvent.click(ingredients[4]);
    userEvent.click(ingredients[5]);
    userEvent.click(ingredients[6]);
    userEvent.click(ingredients[7]);

    const btnFinish = screen.getByTestId('finish-recipe-btn');
    userEvent.click(btnFinish);

    const img = await screen.findByTestId('0-horizontal-image');
    userEvent.click(img);

    expect(history.location.pathname).toBe('/meals/52771');
  });
});
