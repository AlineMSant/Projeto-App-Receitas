import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';

function Drinks() {
  return (
    <div>
      <Header />
      <SearchBar />
      <Recipes />
    </div>
  );
}

export default Drinks;
