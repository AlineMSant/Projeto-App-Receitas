import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

export function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const context = useMemo(() => ({
    meals,
    setMeals,
    drinks,
    setDrinks,
  }), [meals, drinks]);

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
