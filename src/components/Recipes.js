import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
    setSelectedCategory,
    toggleBtn,
    setToggleBtn,
    setSearchTerm,
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
    setMeals(result);
  };

  const requestSelectedCategoryDrinks = async (category) => {
    const result = await fetchSelectedCategoryDrinks(category);
    setDrinks(result);
  };

  // A função passa o teste porém a funcionalidade não muda de categoria de forma direta, para trocar é preciso clicar duas vezes na categoria desejada.
  const handleCategoryClick = (category) => {
    setSearchTerm('');
    if (route === '/meals' && toggleBtn === false) {
      setSelectedCategory(category);
      requestSelectedCategoryMeals(category);
      setToggleBtn(true);
    } else if (route === '/meals' && toggleBtn === true) {
      requestAPIMeals();
      setToggleBtn(false);
    }

    if (route === '/drinks' && toggleBtn === false) {
      setSelectedCategory(category);
      requestSelectedCategoryDrinks(category);
      setToggleBtn(true);
    } else if (route === '/drinks' && toggleBtn === true) {
      requestAPIDrinks();
      setToggleBtn(false);
    }
  };

  const handleClearFilter = () => {
    if (route === '/meals') {
      requestAPIMeals();
    }
    if (route === '/drinks') {
      requestAPIDrinks();
    }
    setSelectedCategory(null);
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
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleClearFilter() }
      >
        All
      </button>
      {(route === '/meals' && meals !== undefined) && (meals.length > 0 && meals
        .map((meal, index) => index < numberMax && (
          <Link to={ `/meals/${meal.idMeal}` } key={ meal.idMeal }>
            <div
              data-testid={ `${index}-recipe-card` }
              key={ meal.idMeal }
            >
              <h6 data-testid={ `${index}-card-name` }>{meal.strMeal}</h6>
              <img
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
            </div>
          </Link>
        ))) }
      {(route === '/drinks' && drinks !== undefined) && (drinks.length > 0 && drinks
        .map((drink, index) => index < numberMax && (
          <Link to={ `/drinks/${drink.idDrink}` } key={ drink.idDrink }>
            <div
              data-testid={ `${index}-recipe-card` }
              key={ drink.idDrink }
            >
              <h6 data-testid={ `${index}-card-name` }>{drink.strDrink}</h6>
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
            </div>
          </Link>
        ))) }

      <Footer />
    </>
  );
}
