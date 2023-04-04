import React from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/styles/Footer.css';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
    >
      <button
        onClick={ () => history.push('/drinks') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </button>

      <button
        onClick={ () => history.push('/meals') }
      >
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="mealIcon"
        />
      </button>

    </footer>
  );
}

export default Footer;
