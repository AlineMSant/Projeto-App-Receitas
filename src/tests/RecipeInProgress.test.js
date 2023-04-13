import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Teste RecipeInProgress', () => {
  const initialClipboardText = { ...global.navigator.clipboard };
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
    let clipboardText = '';
    const mockClipboard = {
      writeText: jest.fn(
        () => { clipboardText = 'http://localhost:3000/meals/52771'; },
      ),
      readText: jest.fn(
        () => clipboardText,
      ),
    };
    global.navigator.clipboard = mockClipboard;
  });
  afterEach(() => {
    jest.resetAllMocks();
    global.navigator.clipboard = initialClipboardText;
  });
  it('Teste RecipeInProgress Meals e botão de compartilhar', async () => {
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

    const imgRecipeDetails = await screen.findByTestId('recipe-photo');
    const titleRecipeDetails = await screen.findByTestId('recipe-title');
    const categoryRecipeDetails = await screen.findByTestId('recipe-category');
    const ingredients = await screen.findAllByRole('checkbox');
    const instructionsRecipeDetails = await screen.findByTestId('instructions');

    const shareBtn = await screen.findByTestId('share-btn');

    userEvent.click(shareBtn);

    const shareLink = 'http://localhost:3000/meals/52771';

    const shareMessage = screen.getByText('Link copied!');

    expect(navigator.clipboard.readText()).toBe(shareLink);
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(shareMessage).toBeInTheDocument();

    expect(imgRecipeDetails).toBeVisible();
    expect(titleRecipeDetails).toBeVisible();
    expect(categoryRecipeDetails).toBeVisible();
    expect(ingredients).toHaveLength(8);
    expect(instructionsRecipeDetails).toBeVisible();
  });

  it('Teste RecipeInProgress Drinks e botão de favoritar', async () => {
    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/drinks');
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
    userEvent.type(inputSearch, 'Aquamarine');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    await waitFor(() => {
      expect(global.fetch).toBeCalled();
    });

    const btnStart = await screen.findByTestId('start-recipe-btn');
    userEvent.click(btnStart);

    const imgRecipeDetails = await screen.findByTestId('recipe-photo');
    const titleRecipeDetails = await screen.findByTestId('recipe-title');
    const categoryRecipeDetails = await screen.findByTestId('recipe-category');
    const ingredients = await screen.findAllByRole('checkbox');
    const instructionsRecipeDetails = await screen.findByTestId('instructions');
    const btnFavorite = await screen.findByTestId('favorite-btn');

    expect(imgRecipeDetails).toBeVisible();
    expect(titleRecipeDetails).toBeVisible();
    expect(categoryRecipeDetails).toBeVisible();
    expect(ingredients).toHaveLength(3);
    expect(instructionsRecipeDetails).toBeVisible();

    const ingredients0 = await screen.findAllByTestId('0-ingredient-step');

    userEvent.click(ingredients[0]);
    expect(ingredients0[0]).toHaveAttribute('class', 'selected');
    userEvent.click(ingredients[0]);
    expect(ingredients0[0]).toHaveAttribute('class', 'no-selected');

    userEvent.click(btnFavorite);

    await act(async () => {
      history.push('/favorite-recipes');
    });

    const imgFavorite = await screen.findByTestId('0-horizontal-image');
    expect(imgFavorite).toBeVisible();

    userEvent.click(imgFavorite);

    const btnFavorite1 = await screen.findByTestId('favorite-btn');
    userEvent.click(btnFavorite1);

    await act(async () => {
      history.push('/favorite-recipes');
    });

    expect(imgFavorite).not.toBeVisible();
  });
});
