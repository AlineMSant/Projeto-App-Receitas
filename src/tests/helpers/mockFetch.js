const mockMeals = require('./mockMeals');

const mockFetch = (url) => {
  if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
    return Promise.resolve({
      json: () => Promise.resolve(mockMeals),
    });
  }
};

module.exports = mockFetch;
