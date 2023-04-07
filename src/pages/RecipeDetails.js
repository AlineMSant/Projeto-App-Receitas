import React from 'react';
import Details from '../components/Details';
import StartBtn from '../components/StartBtn';
import ShareFavoriteBtn from '../components/ShareFavoriteBtn';

function RecipeDetails() {
  return (
    <div>
      <h1>Recipe Details</h1>
      <Details />
      <ShareFavoriteBtn />
      <StartBtn />
    </div>
  );
}

export default RecipeDetails;
