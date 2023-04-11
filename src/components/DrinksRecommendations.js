import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinks } from '../services/fetchAPI';

function DrinksRecommendations() {
  const {
    drinksRecommendations,
    setDrinksRecommendations,
  } = useContext(RecipesContext);

  const six = 6;
  const sliceDrinks = drinksRecommendations.slice(0, six);

  useEffect(() => {
    const requestDrinks = async () => {
      const result = await fetchDrinks();
      setDrinksRecommendations(result);
    };

    requestDrinks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>Recommendation</h3>
      <Carousel>
        { sliceDrinks.map((drink, index) => (
          index % 2 === 0 && (
            <Carousel.Item key={ index }>

              <div
                data-testid={ `${index}-recommendation-card` }
                className="recommendation-card"
              >

                <div className="individual">
                  <Link to={ `/drinks/${drink.idDrink}` }>
                    <img
                      className="image_carousel"
                      src={ drink.strDrinkThumb }
                      alt={ drink.strDrink }
                    />

                    <p data-testid={ `${index}-recommendation-title` }>
                      { drink.strDrink }
                    </p>
                  </Link>
                </div>

                { sliceDrinks[index + 1] && (
                  <div
                    className="individual"
                    data-testid={ `${index + 1}-recommendation-card` }
                  >

                    <Link to={ `/drinks/${sliceDrinks[index + 1].idDrink}` }>
                      <img
                        className="image_carousel"
                        src={ sliceDrinks[index + 1].strDrinkThumb }
                        alt={ sliceDrinks[index + 1].strDrink }
                      />

                      <p data-testid={ `${index + 1}-recommendation-title` }>
                        { sliceDrinks[index + 1].strDrink }

                      </p>
                    </Link>
                  </div>

                ) }
              </div>
            </Carousel.Item>
          )
        ))}
      </Carousel>
    </>
  );
}

export default DrinksRecommendations;
