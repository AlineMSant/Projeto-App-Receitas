import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchSearchIngredient,
  fetchSearchName,
  fetchSearchFirstLetter } from '../services/fetchAPI';

function SearchBar() {
  const { setMeals, searchTerm, searchType, setSearchType } = useContext(RecipesContext);

  const handleSearchType = (value) => {
    setSearchType(value);
  };

  const handleClickSearch = async () => {
    const first = 'first-letter';

    if (searchType === 'name') {
      const fetchName = await fetchSearchName(searchTerm);
      setMeals(fetchName);
    } else if (searchType === 'ingredient') {
      const fetchIgredient = await fetchSearchIngredient(searchTerm);
      setMeals(fetchIgredient);
    } else if (searchType === first && searchTerm.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else if (searchType === first) {
      const fetchFirstLetter = await fetchSearchFirstLetter(searchTerm);
      setMeals(fetchFirstLetter);
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="searchName">
          <input
            type="radio"
            id="searchName"
            name="searchName"
            value="name"
            data-testid="name-search-radio"
            checked={ searchType === 'name' }
            onChange={ (e) => handleSearchType(e.target.value) }
          />
          Name
        </label>
        <label htmlFor="searchIngredient">
          <input
            type="radio"
            id="searchIngredient"
            name="searchIngredient"
            value="ingredient"
            data-testid="ingredient-search-radio"
            checked={ searchType === 'ingredient' }
            onChange={ (e) => handleSearchType(e.target.value) }
          />
          Ingredient
        </label>
        <label htmlFor="searchFirst">
          <input
            type="radio"
            id="searchFirst"
            name="searchFirst"
            value="first-letter"
            data-testid="first-letter-search-radio"
            checked={ searchType === 'first-letter' }
            onChange={ (e) => handleSearchType(e.target.value) }
          />
          First letter
        </label>
        <button
          type="button"
          onClick={ handleClickSearch }
          data-testid="exec-search-btn"
        >
          Procurar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
