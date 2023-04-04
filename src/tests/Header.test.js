import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import Header from '../components/Header';
import App from '../App';
import { AppProvider } from '../context/AppProvider';
import { RecipesProvider } from '../context/Recipes.Provider';

const mockFetch = require('./helpers/mockFetch');
// import mockFetch from './helpers/mockFetch';

describe('Testa o componente Header', () => {
  const searchInput = 'search-input';
  const pageTitleId = 'page-title';
  it('Verifica se o componente é renderizado corretamente', () => {
    renderWithRouter(
      <Header />,
    );

    const pageTitle = screen.getByTestId(pageTitleId);
    const searchElement = screen.queryByTestId(searchInput);

    expect(pageTitle).toHaveTextContent('Recipes App');
    expect(searchElement).toBeNull();
  });

  it('Verifica se redireciona para a página correta ao clicar no botão profile', () => {
    const { history } = renderWithRouter(
      <Header />,
    );

    const profileBtn = screen.getByTestId('profile-top-btn');

    userEvent.click(profileBtn);
    const { location } = history;
    expect(location.pathname).toBe('/profile');
  });

  it('Verifica se o botão de busca mostra/esconde a barra de busca ao ser clicado', () => {
    renderWithRouter(
      <Header />,
    );

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const searchElement = screen.queryByTestId(searchInput);

    expect(searchElement).toBeVisible();
    userEvent.click(searchBtn);
    expect(searchElement).not.toBeVisible();
  });

  it('Verifica se a barra de busca é renderizada corretamente', () => {
    renderWithRouter(
      <Header />,
    );

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const searchElement = screen.queryByTestId(searchInput);

    expect(searchElement).toBeInTheDocument();
    expect(searchElement).toHaveAttribute('type', 'text');
  });

  it('Verifica se as diferentes rotas são renderizadas corretamente', async () => {
    // jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    const { history } = renderWithRouter(
      <RecipesProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </RecipesProvider>,
    );

    await act(async () => {
      history.push('/drinks');
    });

    const pageTitleDrinks = screen.getByTestId(pageTitleId);
    expect(pageTitleDrinks).toHaveTextContent('Drinks');

    await act(async () => {
      history.push('/done-recipes');
    });

    const pageTitleDoneRecipes = screen.getByTestId(pageTitleId);
    expect(pageTitleDoneRecipes).toHaveTextContent('Done Recipes');

    await act(async () => {
      history.push('/favorite-recipes');
    });

    const pageTitleFavoritesRecipes = screen.getByTestId(pageTitleId);
    expect(pageTitleFavoritesRecipes).toHaveTextContent('Favorite Recipes');
  });
});
