import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testa página de Login', () => {
  it('Verifica se a pagina Login é renderizada corretamente', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    expect(email).toBeVisible();
    expect(password).toBeVisible();
    expect(buttonEnter).toBeVisible();
  });

  it('Verifica se o botão só é desabilitado depois de preencher corretamente os inputs e após clicar em Enter a pagina é redirecionada', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    expect(buttonEnter).toBeDisabled();

    userEvent.type(email, 'test@test.com');

    expect(buttonEnter).toBeDisabled();

    userEvent.type(password, '1234567');

    expect(buttonEnter).not.toBeDisabled();

    userEvent.click(buttonEnter);

    const { location } = history;
    expect(location.pathname).toBe('/meals');
  });
});
