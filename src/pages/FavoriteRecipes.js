import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getFavoriteRecipe } from '../helpers/LocalStorage';

function FavoriteRecipes() {
  const [arrayFavoriteRecipes, setArrayFavoriteRecipes] = useState([]);
  useEffect(() => {
    const savedFavoriteRecipes = getFavoriteRecipe();
    setArrayFavoriteRecipes(savedFavoriteRecipes);
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default FavoriteRecipes;
