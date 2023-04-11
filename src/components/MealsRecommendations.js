import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import RecipesContext from '../context/RecipesContext';
import { fetchMeals } from '../services/fetchAPI';

function MealsRecommendations() {
  const {
    mealsRecommendations,
    setMealsRecommendations,
  } = useContext(RecipesContext);

  const six = 6;
  const sliceMeals = mealsRecommendations.slice(0, six);

  useEffect(() => {
    const requestMeals = async () => {
      const result = await fetchMeals();
      setMealsRecommendations(result);
    };

    requestMeals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>Recommendation</h3>
      <Carousel>
        { sliceMeals.map((meal, index) => (
          index % 2 === 0 && (
            <Carousel.Item key={ index }>

              <div
                data-testid={ `${index}-recommendation-card` }
                className="recommendation-card"
              >

                <div className="individual">
                  <Link to={ `/meals/${meal.idMeal}` }>
                    <img
                      className="image_carousel"
                      src={ meal.strMealThumb }
                      alt={ meal.strMeal }
                    />

                    <p data-testid={ `${index}-recommendation-title` }>
                      { meal.strMeal }
                    </p>
                  </Link>
                </div>

                { sliceMeals[index + 1] && (
                  <div
                    className="individual"
                    data-testid={ `${index + 1}-recommendation-card` }
                  >

                    <Link to={ `/meals/${sliceMeals[index + 1].idMeal}` }>
                      <img
                        className="image_carousel"
                        src={ sliceMeals[index + 1].strMealThumb }
                        alt={ sliceMeals[index + 1].strMeal }
                      />

                      <p data-testid={ `${index + 1}-recommendation-title` }>
                        { sliceMeals[index + 1].strMeal }

                      </p>
                    </Link>
                  </div>

                ) }
              </div>
            </Carousel.Item>
          )
        )) }
      </Carousel>
    </>
  );
}

export default MealsRecommendations;
