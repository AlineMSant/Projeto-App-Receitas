export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const getEmail = () => {
  const email = JSON.parse(localStorage.getItem('user'));
  return email;
};

export const saveDoneRecipes = (doneDetails) => {
  const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  doneRecipe.push(doneDetails);
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
};

export const getDoneRecipes = () => {
  const arrayDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return arrayDoneRecipes;
};

export const saveInProgressRecipes = (obj) => {
  localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
};

export const getInProgressRecipes = () => {
  const arrayInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return arrayInProgressRecipes;
};

export const saveFavoriteRecipe = (recipe) => {
  const setFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  setFavoriteRecipes.push(recipe);
  localStorage.setItem('favoriteRecipes', JSON.stringify(setFavoriteRecipes));
};

export const getFavoriteRecipe = () => {
  const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return getFavoriteRecipes;
};

export const updateFavoriteRecipe = (newRecipes) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
};
