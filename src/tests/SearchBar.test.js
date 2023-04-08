import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
// import fetch from '../../cypress/mocks/fetch';
import App from '../App';

describe('Testa SearchBar', () => {
  // beforeEach(() => {
  //   global.fetch = jest.fn(fetch);
  // });
  it('Verifica se ao pesquisar por Name Ingredient ou First Letter é renderizado corretamente em meals', async () => {
    window.alert = jest.fn();

    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/meals');
    });

    // await waitFor(() => {
    //   expect(global.fetch).toBeCalled();
    // });

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

    userEvent.type(inputSearch, 'Chicken');
    userEvent.click(radioIngredient);
    userEvent.click(buttonSearch);

    // await waitFor(() => {
    //   expect(global.fetch).toBeCalled();
    // });

    await waitForElementToBeRemoved(titleFirstRecipeNoFilter);

    const titleFirstRecipeFilteredIngredient = screen.getByText('Brown Stew Chicken');

    expect(titleFirstRecipeNoFilter).not.toBeVisible();
    expect(titleFirstRecipeFilteredIngredient).toBeVisible();

    //

    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'a');
    userEvent.click(radioFisrt);
    userEvent.click(buttonSearch);

    await waitForElementToBeRemoved(titleFirstRecipeFilteredIngredient);

    const titleFirstRecipeFilteredFirst = screen.getByText('Apple Frangipan Tart');

    expect(titleFirstRecipeFilteredFirst).toBeVisible();
    expect(titleFirstRecipeFilteredIngredient).not.toBeVisible();

    //

    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'ab');
    userEvent.click(radioFisrt);
    userEvent.click(buttonSearch);

    expect(window.alert).toBeCalledWith('Your search must have only 1 (one) character');

    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'Arrabiata');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    await waitForElementToBeRemoved(titleFirstRecipeFilteredFirst);

    const titleRecipeDetails = await screen.findByText('Recipe Details');

    expect(titleFirstRecipeFilteredFirst).not.toBeVisible();
    expect(titleRecipeDetails).toBeVisible();
  });

  it('Verifica se ao pesquisar por Name Ingredient ou First Letter é renderizado corretamente em drinks', async () => {
    window.alert = jest.fn();
    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/drinks');
    });

    // await waitFor(() => {
    //   expect(global.fetch).toBeCalled();
    // });

    expect(history.location.pathname).toBe('/drinks');

    const buttonIconSearchDrinks = screen.getByTestId('search-top-btn');

    userEvent.click(buttonIconSearchDrinks);

    const inputSearchDrinks = screen.getByTestId('search-input');
    const radioNameDrinks = screen.getByTestId('name-search-radio');
    const radioIngredientDrinks = screen.getByTestId('ingredient-search-radio');
    const radioFisrtDrinks = screen.getByTestId('first-letter-search-radio');
    const buttonSearchDrinks = screen.getByTestId('exec-search-btn');

    const titleFirstRecipeNoFilterDrinks = await screen.findByText('GG');
    expect(titleFirstRecipeNoFilterDrinks).toBeVisible();

    userEvent.clear(inputSearchDrinks);
    userEvent.type(inputSearchDrinks, 'Light rum');
    userEvent.click(radioIngredientDrinks);
    userEvent.click(buttonSearchDrinks);

    // await waitFor(() => {
    //   expect(global.fetch).toBeCalled();
    // });

    await waitForElementToBeRemoved(titleFirstRecipeNoFilterDrinks);

    const titleFirstRecipeFilteredIngredientDrinks = screen.getByText('151 Florida Bushwacker');

    expect(titleFirstRecipeFilteredIngredientDrinks).toBeVisible();
    expect(titleFirstRecipeNoFilterDrinks).not.toBeVisible();

    //

    userEvent.clear(inputSearchDrinks);
    userEvent.type(inputSearchDrinks, 'p');
    userEvent.click(radioFisrtDrinks);
    userEvent.click(buttonSearchDrinks);

    await waitForElementToBeRemoved(titleFirstRecipeFilteredIngredientDrinks);

    const titleFirstRecipeFilteredFirstDrinks = screen.getByText('Paloma');

    expect(titleFirstRecipeFilteredFirstDrinks).toBeVisible();
    expect(titleFirstRecipeFilteredIngredientDrinks).not.toBeVisible();

    //

    userEvent.clear(inputSearchDrinks);
    userEvent.type(inputSearchDrinks, 'pw');
    userEvent.click(radioFisrtDrinks);
    userEvent.click(buttonSearchDrinks);

    expect(window.alert).toBeCalledWith('Your search must have only 1 (one) character');

    userEvent.clear(inputSearchDrinks);
    userEvent.type(inputSearchDrinks, 'Aquamarine');
    userEvent.click(radioNameDrinks);
    userEvent.click(buttonSearchDrinks);

    // await waitFor(() => {
    //   expect(global.fetch).toBeCalled();
    // });

    await waitForElementToBeRemoved(titleFirstRecipeFilteredFirstDrinks);

    const titleRecipeDetailsDrinks = await screen.findByText('Recipe Details');

    expect(titleFirstRecipeFilteredFirstDrinks).not.toBeVisible();
    expect(titleRecipeDetailsDrinks).toBeVisible();
  });
});
