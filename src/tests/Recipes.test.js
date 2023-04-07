import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente Recipes', () => {
  it('Verifica se o componente é renderizado corretamente', async () => {
    const { history } = renderWithRouter(<App />);

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
    const { history } = renderWithRouter(<App />);

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
    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    const titleRecipeNoFilter = await screen.findByText('Corba');

    const buttonBeef = await screen.findByTestId('Beef-category-filter');
    expect(buttonBeef).toBeVisible();

    userEvent.click(buttonBeef);

    await waitForElementToBeRemoved(titleRecipeNoFilter);

    const titleRecipeFilteredBeef = screen.getByText('Beef and Mustard Pie');
    expect(titleRecipeFilteredBeef).toBeVisible();
    expect(titleRecipeNoFilter).not.toBeVisible();

    userEvent.click(buttonBeef);

    await waitForElementToBeRemoved(titleRecipeFilteredBeef);

    const titleRecipeNoFilteredBeef = screen.getByText('Corba');
    expect(titleRecipeNoFilteredBeef).toBeVisible();
    expect(titleRecipeFilteredBeef).not.toBeVisible();

    userEvent.click(buttonBeef);

    await waitForElementToBeRemoved(titleRecipeNoFilteredBeef);

    const titleRecipeFilteredBeef2 = screen.getByText('Beef and Mustard Pie');
    expect(titleRecipeFilteredBeef2).toBeVisible();
    expect(titleRecipeNoFilteredBeef).not.toBeVisible();

    const buttonAll = screen.getByTestId('All-category-filter');
    expect(buttonAll).toBeVisible();
    userEvent.click(buttonAll);

    await waitForElementToBeRemoved(titleRecipeFilteredBeef2);

    const titleRecipeNoFilterAfterAll = screen.getByText('Corba');
    expect(titleRecipeFilteredBeef2).not.toBeVisible();
    expect(titleRecipeNoFilterAfterAll).toBeVisible();
  });

  it('Verifica filtros em drinks pelos botões de categorias e botão All', async () => {
    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');

    const buttonOrdinary = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(buttonOrdinary).toBeVisible();

    const titleRecipeNoFilterDrinks = await screen.findByText('GG');
    expect(titleRecipeNoFilterDrinks).toBeVisible();

    userEvent.click(buttonOrdinary);

    await waitForElementToBeRemoved(titleRecipeNoFilterDrinks);

    const titleRecipeFilteredOrdinary = screen.getByText('3-Mile Long Island Iced Tea');
    expect(titleRecipeNoFilterDrinks).not.toBeVisible();
    expect(titleRecipeFilteredOrdinary).toBeVisible();

    userEvent.click(buttonOrdinary);

    await waitForElementToBeRemoved(titleRecipeFilteredOrdinary);

    const titleRecipeNoFilteredOrdinary = screen.getByText('GG');
    expect(titleRecipeFilteredOrdinary).not.toBeVisible();
    expect(titleRecipeNoFilteredOrdinary).toBeVisible();

    userEvent.click(buttonOrdinary);

    await waitForElementToBeRemoved(titleRecipeNoFilteredOrdinary);

    const titleRecipeFilteredOrdinary2 = screen.getByText('3-Mile Long Island Iced Tea');
    expect(titleRecipeNoFilteredOrdinary).not.toBeVisible();
    expect(titleRecipeFilteredOrdinary2).toBeVisible();

    const buttonAllDrinks = screen.getByTestId('All-category-filter');

    expect(buttonAllDrinks).toBeVisible();
    userEvent.click(buttonAllDrinks);

    await waitForElementToBeRemoved(titleRecipeFilteredOrdinary2);
    const titleRecipeNoFilterAfterAll = screen.getByText('GG');

    expect(titleRecipeFilteredOrdinary2).not.toBeVisible();
    expect(titleRecipeNoFilterAfterAll).toBeVisible();
  });
});
