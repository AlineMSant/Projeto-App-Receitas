import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Teste o componente Footer', () => {
  const testIdEmail = 'email-input';
  const testIdPassword = 'password-input';
  const testIdButtonEnter = 'login-submit-btn';
  const emailTest = 'test@test.com';

  it('Teste se o componente os botoes e imagens', async () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(testIdEmail);
    const password = screen.getByTestId(testIdPassword);
    const buttonEnter = screen.getByTestId(testIdButtonEnter);

    userEvent.type(email, emailTest);
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    const buttonDrink = screen.getByTestId('drinks-bottom-btn');
    const buttonMeals = screen.getByTestId('meals-bottom-btn');
    expect(buttonDrink).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
  });

  it('Teste se o botao meals está com rota', async () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(testIdEmail);
    const password = screen.getByTestId(testIdPassword);
    const buttonEnter = screen.getByTestId(testIdButtonEnter);

    userEvent.type(email, emailTest);
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    const buttonDrink = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(buttonDrink);
    await waitFor(() => expect(history.location.pathname).toBe('/drinks'));
  });

  it('Teste se o botao drink está com rota', async () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(testIdEmail);
    const password = screen.getByTestId(testIdPassword);
    const buttonEnter = screen.getByTestId(testIdButtonEnter);

    userEvent.type(email, emailTest);
    userEvent.type(password, '1234567');
    userEvent.click(buttonEnter);

    const buttonMeals = screen.getByTestId('meals-bottom-btn');
    userEvent.click(buttonMeals);
    await waitFor(() => expect(history.location.pathname).toBe('/meals'));
  });
});
