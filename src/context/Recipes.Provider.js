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
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [mealsRecommendations, setMealsRecommendations] = useState([]);
  const [drinksRecommendations, setDrinksRecommendations] = useState([]);
  const [disableBtnFinish, setDisableBtnFinish] = useState(true);
  const [copyMessageToggle, setCopyMessageToggle] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [arrayDoneRecipes, setArrayDoneRecipes] = useState([]);
  const [arrayDoneRecipesFiltered, setArrayDoneRecipesFiltered] = useState([]);
  const [arrayFavoriteRecipes, setArrayFavoriteRecipes] = useState([]);
  const [arrayFavoriteRecipesFiltered, setArrayFavoriteRecipesFiltered] = useState([]);

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
    loading,
    setLoading,
    details,
    setDetails,
    ingredients,
    setIngredients,
    measures,
    setMeasures,
    mealsRecommendations,
    setMealsRecommendations,
    drinksRecommendations,
    setDrinksRecommendations,
    disableBtnFinish,
    setDisableBtnFinish,
    copyMessageToggle,
    setCopyMessageToggle,
    isFavorite,
    setIsFavorite,
    arrayDoneRecipes,
    setArrayDoneRecipes,
    arrayDoneRecipesFiltered,
    setArrayDoneRecipesFiltered,
    arrayFavoriteRecipes,
    setArrayFavoriteRecipes,
    arrayFavoriteRecipesFiltered,
    setArrayFavoriteRecipesFiltered,
  }), [
    meals,
    drinks,
    categoriesMeals,
    categoriesDrinks,
    searchType,
    searchTerm,
    selectedCategory,
    toggleBtn,
    loading,
    details,
    ingredients,
    measures,
    mealsRecommendations,
    drinksRecommendations,
    disableBtnFinish,
    isFavorite,
    setIsFavorite,
    copyMessageToggle,
    setCopyMessageToggle,
    arrayDoneRecipes,
    arrayDoneRecipesFiltered,
    arrayFavoriteRecipes,
    arrayFavoriteRecipesFiltered,
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
