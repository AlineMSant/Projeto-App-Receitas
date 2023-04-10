import React, { useEffect, useState } from 'react';
import { getFavoriteRecipe } from '../helpers/LocalStorage';

function BtnFiltersFav() {
  const [arrayFavoriteRecipes, setArrayFavoriteRecipes] = useState([]);
  useEffect(() => {
    const savedFavoriteRecipes = getFavoriteRecipe();
    setArrayFavoriteRecipes(savedFavoriteRecipes);
  }, []);

  return (
    <div>
        
    </div>
  );
}

export default BtnFiltersFav;
