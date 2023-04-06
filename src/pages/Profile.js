import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const emailLocalStorage = JSON.parse(localStorage.getItem('user')).email;

  return (
    <div>
      <Header />

      <h4 data-testid="profile-email">{emailLocalStorage}</h4>

      <button
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}

export default Profile;
