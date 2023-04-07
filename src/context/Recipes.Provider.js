import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

export function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categoriesMeals, setCategoriesMeals] = useState([]);
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [searchType, setSearchType] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [toggleBtn, setToggleBtn] = useState(false);

  const context = useMemo(() => ({
    meals,
    setMeals,
    drinks,
    setDrinks,
    categoriesMeals,
    setCategoriesMeals,
    categoriesDrinks,
    setCategoriesDrinks,
    searchType,
    setSearchType,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    toggleBtn,
    setToggleBtn,
  }), [
    meals,
    drinks,
    categoriesMeals,
    categoriesDrinks,
    searchType,
    searchTerm,
    selectedCategory,
    toggleBtn,
  ]);

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
