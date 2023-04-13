import React from 'react';
import { screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Teste FavoriteRecipes', () => {
  const imgTestIdFavorite = '0-horizontal-image';
  it('Teste se é redirecionado quando clica na imagem em drinks', async () => {
    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/drinks');
    });

    const buttonIconSearch = screen.getByTestId('search-top-btn');

    userEvent.click(buttonIconSearch);

    const inputSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.clear(inputSearch);
    userEvent.type(inputSearch, 'Aquamarine');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    const loading = await screen.findByText('Carregando...');
    waitForElementToBeRemoved(loading);

    const img = await screen.findByTestId('recipe-photo');
    expect(img).toBeVisible();

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toBeVisible();
    userEvent.click(favoriteBtn);

    await act(async () => {
      history.push('/favorite-recipes');
    });

    const imgFavoriteDrink = await screen.findByTestId(imgTestIdFavorite);
    userEvent.click(imgFavoriteDrink);

    expect(history.location.pathname).toBe('/drinks/178319');

    await act(async () => {
      history.push('/favorite-recipes');
    });

    const nameFavorite = await screen.findByTestId('0-horizontal-name');
    userEvent.click(nameFavorite);

    expect(history.location.pathname).toBe('/drinks/178319');
  });
});
