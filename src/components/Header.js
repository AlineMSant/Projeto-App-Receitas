import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

function Header() {
  const route = useLocation();
  const history = useHistory();
  const [showSearchInput, setShowSearchInput] = useState(false);
  const { setSearchTerm } = useContext(RecipesContext);

  function getPageTitle(pathname) {
    switch (pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return 'Recipes App';
    }
  }

  const title = getPageTitle(route.pathname);

  const renderSearchBtn = ![
    '/profile',
    '/done-recipes',
    '/favorite-recipes',
  ].includes(route.pathname);

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  return (
    <>
      <div>
        <button
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img src={ ProfileIcon } alt="Profile Icon" data-testid="profile-top-btn" />
        </button>

        <span
          data-testid="page-title"
        >
          { title }
        </span>

        { renderSearchBtn && (
          <button
            type="button"
            onClick={ () => setShowSearchInput(!showSearchInput) }
          >
            <img src={ SearchIcon } alt="Search Icon" data-testid="search-top-btn" />
          </button>
        ) }
      </div>

      <div>
        { showSearchInput && (
          <input
            data-testid="search-input"
            type="text"
            onChange={ (e) => handleSearchTerm(e.target.value) }
          />
        ) }
      </div>
    </>
  );
}

export default Header;
