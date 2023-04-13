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
  it('Teste se a page DoneRecipes é renderizada corretamente para drinks', async () => {
    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/drinks');
    });

    // await waitFor(() => {
    //   expect(global.fetch).toBeCalled();
    // });

    const buttonIconSearch = screen.getByTestId('search-top-btn');

    userEvent.click(buttonIconSearch);

    const inputSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'B-52');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    // await waitFor(() => {
    //   expect(global.fetch).toBeCalled();
    // });
    const loading = await screen.findByText('Carregando...');
    waitForElementToBeRemoved(loading);

    const btnStart = await screen.findByRole('button', { name: 'Start Recipe' });
    userEvent.click(btnStart);

    const imgRecipeDetailsDrink = await screen.findByTestId('recipe-photo');
    const titleRecipeDetailsDrink = await screen.findByTestId('recipe-title');
    const categoryRecipeDetailsDrink = await screen.findByTestId('recipe-category');
    const instructionsRecipeDetailsDrink = await screen.findByTestId('instructions');
    const ingredientsDrink = await screen.findAllByRole('checkbox');

    expect(imgRecipeDetailsDrink).toBeVisible();
    expect(titleRecipeDetailsDrink).toBeVisible();
    expect(categoryRecipeDetailsDrink).toBeVisible();
    expect(instructionsRecipeDetailsDrink).toBeVisible();
    expect(ingredientsDrink).toHaveLength(3);

    userEvent.click(ingredientsDrink[0]);
    userEvent.click(ingredientsDrink[1]);
    userEvent.click(ingredientsDrink[2]);

    const btnFinish = screen.getByTestId('finish-recipe-btn');
    userEvent.click(btnFinish);

    const ingredientDrink = await screen.findByText('IBA');

    expect(ingredientDrink).toBeVisible();
  });

  it('Teste se ao clicar na imagem é redirecionado corretamente', async () => {
    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/drinks/15853/in-progress');
    });

    // await waitFor(() => {
    //   expect(global.fetch).toBeCalled();
    // });

    const ingredientsDrink = await screen.findAllByRole('checkbox');

    expect(ingredientsDrink).toHaveLength(3);

    userEvent.click(ingredientsDrink[0]);
    userEvent.click(ingredientsDrink[1]);
    userEvent.click(ingredientsDrink[2]);

    const btnFinish = screen.getByTestId('finish-recipe-btn');
    userEvent.click(btnFinish);

    const img = await screen.findByTestId('0-horizontal-image');
    userEvent.click(img);

    expect(history.location.pathname).toBe('/drinks/15853');
  });
});
