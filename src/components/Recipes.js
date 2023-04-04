import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchMeals,
  fetchDrinks,
  fetchCategoryMeals,
  fetchCategoryDrinks } from '../services/fetchAPI';
import RecipesContext from '../context/RecipesContext';
import Footer from './Footer';

export default function Recipes() {
  const { meals,
    setMeals,
    drinks,
    setDrinks,
    categoriesMeals,
    setCategoriesMeals,
    categoriesDrinks,
    setCategoriesDrinks,
  } = useContext(RecipesContext);

  const numberOfRecipes = 11;
  const numberOfCategories = 4;
  const { location } = useHistory();
  const route = location.pathname;

  const requestAPIMeals = async () => {
    const result = await fetchMeals();
    const arrayOfMeals = [];
    for (let i = 0; i <= numberOfRecipes; i += 1) {
      arrayOfMeals.push(result[i]);
    }
    setMeals(arrayOfMeals);
  };

  const requestAPICategoryMeals = async () => {
    const result = await fetchCategoryMeals();
    const arrayOfCategoriesMeals = [];
    for (let i = 0; i <= numberOfCategories; i += 1) {
      arrayOfCategoriesMeals.push(result[i].strCategory);
    }
    setCategoriesMeals(arrayOfCategoriesMeals);
  };

  const requestAPIDrinks = async () => {
    const result = await fetchDrinks();
    const arrayOfDrinks = [];
    for (let i = 0; i <= numberOfRecipes; i += 1) {
      arrayOfDrinks.push(result[i]);
    }
    setDrinks(arrayOfDrinks);
  };

  const requestAPICategoryDrinks = async () => {
    const result = await fetchCategoryDrinks();
    const arrayOfCategoriesDrinks = [];
    for (let i = 0; i <= numberOfCategories; i += 1) {
      arrayOfCategoriesDrinks.push(result[i].strCategory);
    }
    setCategoriesDrinks(arrayOfCategoriesDrinks);
  };

  useEffect(() => {
    if (route === '/meals') {
      requestAPIMeals();
      requestAPICategoryMeals();
    }
    if (route === '/drinks') {
      requestAPIDrinks();
      requestAPICategoryDrinks();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>Recipes</div>
      {route === '/meals' && (categoriesMeals.map((category) => (
        <div
          key={ category }
        >
          <button
            type="button"
            data-testid={ `${category}-category-filter` }
          >
            {category}
          </button>
        </div>
      ))) }
      {route === '/drinks' && (categoriesDrinks.map((category) => (
        <div
          key={ category }
        >
          <button
            type="button"
            data-testid={ `${category}-category-filter` }
          >
            {category}
          </button>
        </div>
      ))) }
      {route === '/meals' && (meals.map((meal, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ meal.strMeal }
        >
          <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
          <img
            data-testid={ `${index}-card-img` }
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
          />
        </div>
      ))) }
      {route === '/drinks' && (drinks.map((drink, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ drink.strDrink }
        >
          <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          <img
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
        </div>
      ))) }

      <Footer />
    </>
  );
}
