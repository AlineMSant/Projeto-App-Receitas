import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testes Profile', () => {
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  const buttonEnterTestId = 'login-submit-btn';
  const emailTest = 'test@test.com';

  it('Testa se o email esta visivel na página, se a rota é profile e rota ao clicar no botão Done Recipes ', async () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);
    const buttonEnter = screen.getByTestId(buttonEnterTestId);

    userEvent.type(email, emailTest);
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    await act(async () => {
      history.push('/profile');
    });

    expect(history.location.pathname).toBe('/profile');

    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeVisible();

    const buttonDoneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(buttonDoneRecipes);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Testa se rota é redirecionada ao clicar no botão Favorite Recipes ', async () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);
    const buttonEnter = screen.getByTestId(buttonEnterTestId);

    userEvent.type(email, emailTest);
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    await act(async () => {
      history.push('/profile');
    });

    const buttonFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    userEvent.click(buttonFavoriteRecipes);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Testa se rota é redirecionada ao clicar no botão Logout ', async () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);
    const buttonEnter = screen.getByTestId(buttonEnterTestId);

    userEvent.type(email, emailTest);
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    await act(async () => {
      history.push('/profile');
    });

    const buttonLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(buttonLogout);

    expect(history.location.pathname).toBe('/');
  });
});
