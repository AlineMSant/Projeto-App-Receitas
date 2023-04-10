import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Teste o componente ShareFavoriteBtn', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });
  it('Teste se os botões são renderizado e sua implementação', async () => {
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

    const buttonIconShare = await screen.findByTestId('share-btn');
    const buttonIconFavorite = await screen.findByTestId('favorite-btn');

    expect(buttonIconShare).toBeVisible();
    expect(buttonIconFavorite).toBeVisible();

    expect(buttonIconFavorite).toHaveAttribute('src', 'whiteHeartIcon.svg');

    // userEvent.click(buttonIconShare);
    // const messageShared = screen.getByText('Link copied!');
    // expect(messageShared).toBeVisible();

    // userEvent.click(buttonIconFavorite);
    // expect(buttonIconFavorite).toHaveAttribute('src', 'blackHeartIcon.svg');
  });
});
