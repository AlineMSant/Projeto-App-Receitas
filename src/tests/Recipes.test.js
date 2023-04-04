import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import { AppProvider } from '../context/AppProvider';
import { RecipesProvider } from '../context/Recipes.Provider';

// const mockFetch = require('./helpers/mockFetch');

describe('Testa o componente Recipes', () => {
  it('Verifica se o componente é renderizado corretamente', async () => {
    // jest.spyOn(global, 'fetch').mockImplementation(mockFetch('https://www.themealdb.com/api/json/v1/1/search.php?s='));

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

    const buttonBeef = await screen.findByTestId('Beef-category-filter');
    const buttonBreakfast = await screen.findByTestId('Breakfast-category-filter');
    const buttonChicken = await screen.findByTestId('Chicken-category-filter');
    const buttonDessert = await screen.findByTestId('Dessert-category-filter');
    const buttonGoat = await screen.findByTestId('Goat-category-filter');

    expect(buttonBeef).toBeVisible();
    expect(buttonBreakfast).toBeVisible();
    expect(buttonChicken).toBeVisible();
    expect(buttonDessert).toBeVisible();
    expect(buttonGoat).toBeVisible();
  });
});
