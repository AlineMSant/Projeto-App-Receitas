import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import { RecipesProvider } from '../context/Recipes.Provider';
import App from '../App';
import { AppProvider } from '../context/AppProvider';

describe('Testa SearchBar', () => {
  it('Verifica se ao pesquisar por Name Ingredient ou First Letter é renderizado corretamente', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
    );

    await act(async () => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    const buttonIconSearch = screen.getByTestId('search-top-btn');

    userEvent.click(buttonIconSearch);

    const inputSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioFisrt = screen.getByTestId('first-letter-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    expect(inputSearch).toBeVisible();
    expect(radioName).toBeVisible();
    expect(radioIngredient).toBeVisible();
    expect(radioFisrt).toBeVisible();
    expect(buttonSearch).toBeVisible();

    const titleFirstRecipeNoFilter = await screen.findByText('Corba');
    expect(titleFirstRecipeNoFilter).toBeVisible();

    userEvent.type(inputSearch, 'sushi');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    await waitForElementToBeRemoved(titleFirstRecipeNoFilter);

    const titleFirstRecipeFilteredName = screen.getByText('Sushi');

    expect(titleFirstRecipeNoFilter).not.toBeVisible();
    expect(titleFirstRecipeFilteredName).toBeVisible();

    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'flour');
    userEvent.click(radioIngredient);
    userEvent.click(buttonSearch);

    await waitForElementToBeRemoved(titleFirstRecipeFilteredName);

    const titleFirstRecipeFilteredIngredient = screen.getByText('Apam balik');

    expect(titleFirstRecipeFilteredIngredient).toBeVisible();
    expect(titleFirstRecipeFilteredName).not.toBeVisible();

    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'p');
    userEvent.click(radioFisrt);
    userEvent.click(buttonSearch);

    await waitForElementToBeRemoved(titleFirstRecipeFilteredIngredient);

    const titleFirstRecipeFilteredFirst = screen.getByText('Pad See Ew');

    expect(titleFirstRecipeFilteredFirst).toBeVisible();
    expect(titleFirstRecipeFilteredIngredient).not.toBeVisible();

    // falta testar alert
  });
});
