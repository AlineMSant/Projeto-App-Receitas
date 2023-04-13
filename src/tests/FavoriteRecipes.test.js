import React from 'react';
import { screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Teste FavoriteRecipes', () => {
  const imgTestIdFavorite = '0-horizontal-image';
  const photoTestId = 'recipe-photo';
  const favoriteBtnTestId = 'favorite-btn';
  const routeFavoriteRecipes = '/favorite-recipes';
  it('Teste se a page é renderizada corretamente e seus botões para meals', async () => {
    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/meals');
    });

    const buttonIconSearch = screen.getByTestId('search-top-btn');

    userEvent.click(buttonIconSearch);

    const inputSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'Burek');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    const loading = await screen.findByText('Carregando...');
    waitForElementToBeRemoved(loading);

    const img = await screen.findByTestId(photoTestId);
    expect(img).toBeVisible();

    const favoriteBtn = await screen.findByTestId(favoriteBtnTestId);
    expect(favoriteBtn).toBeVisible();
    userEvent.click(favoriteBtn);

    await act(async () => {
      history.push(routeFavoriteRecipes);
    });

    const btnAllFavorite = await screen.findByTestId('filter-by-all-btn');
    const btnMealsFavorite = await screen.findByTestId('filter-by-meal-btn');
    const btnDrinksFavorite = await screen.findByTestId('filter-by-drink-btn');
    const imgFavorite = await screen.findByTestId(imgTestIdFavorite);
    const nameFavorite = await screen.findByTestId('0-horizontal-name');
    const btnFavorite = await screen.findByTestId('0-horizontal-favorite-btn');

    expect(btnAllFavorite).toBeVisible();
    expect(btnMealsFavorite).toBeVisible();
    expect(btnDrinksFavorite).toBeVisible();
    expect(imgFavorite).toBeVisible();
    expect(nameFavorite).toBeVisible();
    expect(btnFavorite).toBeVisible();

    userEvent.click(btnDrinksFavorite);
    expect(imgFavorite).not.toBeVisible();

    userEvent.click(btnMealsFavorite);
    const imgFavoriteAfterMeals = await screen.findByTestId(imgTestIdFavorite);
    expect(imgFavoriteAfterMeals).toBeVisible();

    userEvent.click(btnAllFavorite);
    const imgFavoriteAfterAll = await screen.findByTestId(imgTestIdFavorite);
    expect(imgFavoriteAfterAll).toBeVisible();

    userEvent.click(imgFavoriteAfterAll);

    const img1 = await screen.findByTestId(photoTestId);
    expect(img1).toBeVisible();

    const favoriteBtn1 = await screen.findByTestId(favoriteBtnTestId);
    expect(favoriteBtn1).toBeVisible();
    userEvent.click(favoriteBtn1);

    await act(async () => {
      history.push(routeFavoriteRecipes);
    });

    expect(btnFavorite).not.toBeVisible();
  });

  it('Teste se é redirecionado quando clica na imagem', async () => {
    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/meals');
    });

    const buttonIconSearch = screen.getByTestId('search-top-btn');

    userEvent.click(buttonIconSearch);

    const inputSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'Burek');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    const loading = await screen.findByText('Carregando...');
    waitForElementToBeRemoved(loading);

    const img = await screen.findByTestId(photoTestId);
    expect(img).toBeVisible();

    const favoriteBtn = await screen.findByTestId(favoriteBtnTestId);
    expect(favoriteBtn).toBeVisible();
    userEvent.click(favoriteBtn);

    await act(async () => {
      history.push(routeFavoriteRecipes);
    });

    const imgFavorite = await screen.findByTestId(imgTestIdFavorite);
    userEvent.click(imgFavorite);

    expect(history.location.pathname).toBe('/meals/53060');

    await act(async () => {
      history.push(routeFavoriteRecipes);
    });

    const nameFavorite = await screen.findByTestId('0-horizontal-name');
    userEvent.click(nameFavorite);

    expect(history.location.pathname).toBe('/meals/53060');
  });
});
