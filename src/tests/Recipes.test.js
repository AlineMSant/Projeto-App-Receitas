import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';

import App from '../App';
import { AppProvider } from '../context/AppProvider';
import Meals from '../pages/Meals';

describe('Testa o componente Recipes', () => {
  it('Verifica se o componente é renderizado corretamente', () => {
    renderWithRouter(
      <Meals />,
    );
  });
});
