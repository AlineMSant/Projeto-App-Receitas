import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
// import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      {/* <Route path="*" component={ NotFound } /> */}

    </Switch>

  );
}

export default App;

// Requisito 11/12/29/30/31/45/46/57/58/59/60/61/62: Aline;
// Requisito 17: Nicola;
// Requisito 7/8/33/34/35/36/41/42/47/50/51/53/54: Patrick;
// Requisito 19/38: Samara;
// Requisito 10/48: Aline, Camila;
// Requisito 16/18: Aline, Nicola;
// Requisito 22/27: Nicola, Patrick;
// Requisito 37: Patrick, Samara;
// Requisito 40/43/44: Aline, Samara;
// Requisito 49/52: Aline, Patrick;
// Requisito 21: Aline, Nicola, Patrick;
// Requisito 26/28/32: Patrick, Samara, Nicola;
// Requisito 39: Aline, Patrick, Samara;
// Requisito 9/23/24/25: Aline, Nicola, Patrick, Samara;
// Requisito 13/14/15: Aline, Patrick, Camila, Samara;
// Requisito 1/2/3/4/5/6/20: Aline, Nicola, Camila, Patrick, Samara;
