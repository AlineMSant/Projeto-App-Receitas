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
  return data.meals;
};

export const fetchSearchName = async (name) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data.meals;
};

export const fetchSearchFirstLetter = async (firstLetter) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  return data.meals;
};

export const fetchSearchIngredientDrinks = async (ingredient) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.drinks;
};

export const fetchSearchNameDrinks = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data.drinks;
};

export const fetchSearchFirstLetterDrinks = async (firstLetter) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await response.json();
  return data.drinks;
};
