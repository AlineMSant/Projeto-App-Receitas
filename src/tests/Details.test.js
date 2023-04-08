import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act, waitFor } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';

describe('Testa o componente Details', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });
  it('Verifica se o componente é renderizado corretamente em meals', async () => {
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

    const imgRecipeDetails = await screen.findByTestId('recipe-photo');
    const titleRecipeDetails = await screen.findByTestId('recipe-title');
    const categoryRecipeDetails = await screen.findByTestId('recipe-category');
    const liRecipeDetails = await screen.findByTestId('0-ingredient-name-and-measure');
    const instructionsRecipeDetails = await screen.findByTestId('instructions');
    const videoRecipeDetails = await screen.findByTestId('video');

    expect(imgRecipeDetails).toBeVisible();
    expect(titleRecipeDetails).toBeVisible();
    expect(categoryRecipeDetails).toBeVisible();
    expect(liRecipeDetails).toBeVisible();
    expect(instructionsRecipeDetails).toBeVisible();
    expect(videoRecipeDetails).toBeVisible();
  });

  it('Verifica se o componente é renderizado corretamente em drinks', async () => {
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

    const imgRecipeDetails = await screen.findByTestId('recipe-photo');
    const titleRecipeDetails = await screen.findByTestId('recipe-title');
    const categoryRecipeDetails = await screen.findByTestId('recipe-category');
    const liRecipeDetails = await screen.findByTestId('0-ingredient-name-and-measure');
    const instructionsRecipeDetails = await screen.findByTestId('instructions');

    expect(imgRecipeDetails).toBeVisible();
    expect(titleRecipeDetails).toBeVisible();
    expect(categoryRecipeDetails).toBeVisible();
    expect(liRecipeDetails).toBeVisible();
    expect(instructionsRecipeDetails).toBeVisible();
  });
});
