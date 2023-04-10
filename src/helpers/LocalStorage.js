export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const getEmail = () => {
  const email = JSON.parse(localStorage.getItem('user'));
  return email;
};

// utilizar no requisito que solicitar doneRecipes LOCALSTORAGE, retirei o save de Login foi feito para testar requisito 29.
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
    id: '17222',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'A1',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    doneDate: '2022/March/7',
    tags: [],
  }];

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
};

export const getDoneRecipes = () => {
  const arrayDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return arrayDoneRecipes;
};

// utilizar no requisito que solicitar doneRecipes LOCALSTORAGE, retirei o save de Login foi feito para testar requisito 30.
export const saveInProgressRecipes = () => {
  const recipesInProgress = {
    drinks: {
      178319: ['Galliano', 'Ginger ale', 'Ice'],
    },
    meals: {
      52771: ['Filo Pastry', 'Minced Beef', 'Onion', 'Oil', 'Salt', 'Pepper'],
    },
  };

  localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
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
