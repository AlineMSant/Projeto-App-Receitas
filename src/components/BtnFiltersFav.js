import React, { useEffect, useState } from 'react';
import { getFavoriteRecipe } from '../helpers/LocalStorage';

function BtnFiltersFav() {
  const [arrayFavoriteRecipes, setArrayFavoriteRecipes] = useState([]);
  useEffect(() => {
    const savedFavoriteRecipes = getFavoriteRecipe();
    setArrayFavoriteRecipes(savedFavoriteRecipes);
  }, []);
}

export default BtnFiltersFav;
