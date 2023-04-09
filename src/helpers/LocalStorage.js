export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const getEmail = () => {
  const email = JSON.parse(localStorage.getItem('user'));
  return email;
};

// utilizar no requisito que solicitar doneRecipes LOCALSTORAGE
export const saveDoneRecipes = () => {
  const doneRecipe = [{
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    doneDate: '2022/March/7',
    tags: ['Soup'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: '',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '2022/March/7',
    tags: [],
  }];

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
};

export const getDoneRecipes = () => {
  const arrayDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return arrayDoneRecipes;
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

export default {
  saveEmail,
  getEmail,
  saveDoneRecipes,
  saveFavoriteRecipe,
  getFavoriteRecipe };
