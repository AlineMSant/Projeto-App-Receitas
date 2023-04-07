import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { AppProvider } from '../../context/AppProvider';
import { RecipesProvider } from '../../context/Recipes.Provider';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      <RecipesProvider>
        <AppProvider>
          { component }
        </AppProvider>
      </RecipesProvider>
      ,
    </Router>
  );
}

export function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}
