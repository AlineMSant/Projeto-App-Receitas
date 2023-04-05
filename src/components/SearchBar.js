import React, { useState } from 'react';

function SearchBar() {
  const [searchType, setSearchType] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchType = (event) => {
    setSearchType(event.target.value);
  };

  const handlesearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // Handle search logic here
  };

  return (
    <div>
      <form>
        <label>
          <input
            type="radio"
            name="search-type"
            value="name"
            data-testid="name-search-radio"
            checked={ searchType === 'name' }
            onChange={ handleSearchType }
          />
          Procurar por nome
        </label>
        <label>
          <input
            type="radio"
            name="search-type"
            value="ingredient"
            data-testid="ingredient-search-radio"
            checked={ searchType === 'ingredient' }
            onChange={ handleSearchType }
          />
          Procurar por ingrediente
        </label>
        <input
          type="radio"
          name="search-type"
          value="first-letter"
          data-testid="first-letter-search-radio"
          checked={ searchType === 'first-letter' }
          onChange={ handleSearchType }
        />
        <input
          type="text"
          value={ searchTerm }
          onChange={ handlesearchTerm }
        />
        <button
          type="button"
          onClick={ handleSearch }
          data-testid="exec-search-btn"
        >
          Procurar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
