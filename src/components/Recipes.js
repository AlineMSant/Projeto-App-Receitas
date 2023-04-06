import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchMeals,
  fetchDrinks,
  fetchCategoryMeals,
  fetchCategoryDrinks,
  fetchSelectedCategoryMeals,
  fetchSelectedCategoryDrinks } from '../services/fetchAPI';
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
    // selectedCategory,
    setSelectedCategory,
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

  const requestSelectedCategoryMeals = async (category) => {
    const result = await fetchSelectedCategoryMeals(category);
    const arrayOfMeals = [];
    for (let i = 0; i <= numberOfRecipes; i += 1) {
      arrayOfMeals.push(result[i]);
    }
    setMeals(arrayOfMeals);
  };

  const requestSelectedCategoryDrinks = async (category) => {
    const result = await fetchSelectedCategoryDrinks(category);
    const arrayOfDrinks = [];
    for (let i = 0; i <= numberOfRecipes; i += 1) {
      arrayOfDrinks.push(result[i]);
    }
    setDrinks(arrayOfDrinks);
  };

  const handleCategoryClick = (category) => {
    if (route === '/meals') {
      setSelectedCategory(category);
      requestSelectedCategoryMeals(category);
    }
    if (route === '/drinks') {
      setSelectedCategory(category);
      requestSelectedCategoryDrinks(category);
    }
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

  const numberMax = 12;

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
            onClick={ () => handleCategoryClick(category) }
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
            onClick={ () => handleCategoryClick(category) }
          >
            {category}
          </button>
        </div>
      ))) }
      {(route === '/meals' && meals !== undefined) && (meals.length > 0 && meals
        .map((meal, index) => index < numberMax && (
          <div key={ index }>
            { meal !== undefined && (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ index }
              >
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                />
              </div>
            )}
          </div>
        ))) }
      {(route === '/drinks' && drinks !== undefined) && (drinks.length > 0 && drinks
        .map((drink, index) => index < numberMax && (
          <div key={ index }>
            { drink !== undefined && (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ index }
              >
                <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
              </div>
            )}
          </div>
        ))) }

      <Footer />
    </>
  );
}
