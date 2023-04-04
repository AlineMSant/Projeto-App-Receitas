import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchMeals, fetchDrinks } from '../services/fetchAPI';
import RecipesContext from '../context/RecipesContext';
import Footer from './Footer';

export default function Recipes() {
  const { meals, setMeals, drinks, setDrinks } = useContext(RecipesContext);
  const numberOfRecipes = 11;

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

  const requestAPIDrinks = async () => {
    const result = await fetchDrinks();
    const arrayOfDrinks = [];

    for (let i = 0; i <= numberOfRecipes; i += 1) {
      arrayOfDrinks.push(result[i]);
    }
    setDrinks(arrayOfDrinks);
  };

  useEffect(() => {
    if (route === '/meals') {
      requestAPIMeals();
    }
    requestAPIDrinks();
  }, []);

  return (
    <>
      <div>Recipes</div>
      {route === '/meals' ? (meals.map((meal, index) => (
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
      ))) : (drinks.map((drink, index) => (
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
      )))}

      <Footer />
    </>
  );
}
