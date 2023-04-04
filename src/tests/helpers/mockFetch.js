const mockMeals = require('./mockMeals');
const mockMealsCategories = require('./mockMealCategories');

const mockFetch = (url) => {
  if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
    return Promise.resolve({
      json: () => Promise.resolve(mockMeals),
    });
  }

  if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
    return Promise.resolve({
      json: () => Promise.resolve(mockMealsCategories),
    });
  }
};

module.exports = mockFetch;
