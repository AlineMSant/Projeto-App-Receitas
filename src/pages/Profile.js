import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getEmail } from '../helpers/LocalStorage';

function Profile() {
  const history = useHistory();
  const emailLocalStorage = getEmail();

  const handleClickLogout = () => {
    // https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/clear
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />

      { emailLocalStorage && (
        <h4 data-testid="profile-email">
          {emailLocalStorage.email}
        </h4>) }

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}

export default Profile;
