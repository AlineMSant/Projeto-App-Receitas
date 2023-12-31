const ErrorMessage = 'Sorry, we haven\'t found any recipes for these filters.';

export const fetchMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();

  return data.meals;
};

export const fetchDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();

  return data.drinks;
};

export const fetchCategoryMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();

  return data.meals;
};

export const fetchCategoryDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();

  return data.drinks;
};

export const fetchSearchIngredient = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();

  return !data.meals
    ? global.alert(ErrorMessage)
    : data.meals;
};

export const fetchSearchName = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();

  return !data.meals
    ? global.alert(ErrorMessage)
    : data.meals;
};

export const fetchSearchFirstLetter = async (firstLetter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();

  return data.meals;
};

export const fetchSearchIngredientDrinks = async (ingredient) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();

    return data.drinks;
  } catch (error) {
    if (error.message === 'Unexpected end of JSON input') {
      return global.alert(ErrorMessage);
    }
    return error;
  }
};

export const fetchSearchNameDrinks = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();

  return !data.drinks
    ? global.alert(ErrorMessage)
    : data.drinks;
};

export const fetchSearchFirstLetterDrinks = async (firstLetter) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();

  return data.drinks;
};

export const fetchSelectedCategoryMeals = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();

  return data.meals;
};

export const fetchSelectedCategoryDrinks = async (category) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();

  return data.drinks;
};

export const fetchIdMeal = async (idMeal) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  const data = await response.json();
  return data.meals;
};

export const fetchIdDrink = async (idDrink) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
  const data = await response.json();
  return data.drinks;
};
