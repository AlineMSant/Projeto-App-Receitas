import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import { AppProvider } from '../context/AppProvider';
import { RecipesProvider } from '../context/Recipes.Provider';

// const mockFetch = require('./helpers/mockFetch');

describe('Testa o componente Recipes', () => {
  it('Verifica se o componente é renderizado corretamente', async () => {
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

  it('Verifica o retorno da API na rota /meals', async () => {
    // jest.spyOn(global, 'fetch').mockImplementation(mockFetch('https://www.themealdb.com/api/json/v1/1/search.php?s='));

    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
    );

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'test@test.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    const titleFirstRecipe = await screen.findByText('Corba');

    expect(titleFirstRecipe).toBeVisible();

    const buttonDrinks = screen.getByTestId('drinks-bottom-btn');

    expect(buttonDrinks).toBeVisible();

    userEvent.click(buttonDrinks);

    expect(history.location.pathname).toBe('/drinks');

    const titleFirstDrink = await screen.findByText('GG');

    expect(titleFirstDrink).toBeVisible();
  });
  it('Verifica filtros em meals pelos botões de categorias', async () => {
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

    const buttonBeef = await screen.findByTestId('Beef-category-filter');

    expect(buttonBeef).toBeVisible();

    const allTitleRecipeNoFilter = await screen.findAllByRole('heading', { level: 6 });

    expect(allTitleRecipeNoFilter).toHaveLength(12);
    userEvent.click(buttonBeef);

    const allTitleFilteredBeef = await screen.findAllByRole('heading', { level: 6 });

    expect(allTitleFilteredBeef).toHaveLength(12);

    const buttonAll = screen.getByTestId('All-category-filter');

    expect(buttonAll).toBeVisible();
    userEvent.click(buttonAll);

    const allTitleFilteredAll = await screen.findAllByRole('heading', { level: 6 });

    expect(allTitleFilteredAll).toHaveLength(12);
  });
  it('Verifica filtros em drinks pelos botões de categorias e botão All', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
    );

    await act(async () => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');

    const buttonOrdinary = await screen.findByTestId('Ordinary Drink-category-filter');

    expect(buttonOrdinary).toBeVisible();

    const allTitleRecipeNoFilterDrinks = await screen.findAllByRole('heading', { level: 6 });

    expect(allTitleRecipeNoFilterDrinks).toHaveLength(12);
    userEvent.click(buttonOrdinary);

    const allTitleFilteredOrdinary = await screen.findAllByRole('heading', { level: 6 });

    expect(allTitleFilteredOrdinary).toHaveLength(12);

    const buttonAllDrinks = screen.getByTestId('All-category-filter');

    expect(buttonAllDrinks).toBeVisible();
    userEvent.click(buttonAllDrinks);

    const allTitleFilteredAllDrinks = await screen.findAllByRole('heading', { level: 6 });

    expect(allTitleFilteredAllDrinks).toHaveLength(12);
  });
});
