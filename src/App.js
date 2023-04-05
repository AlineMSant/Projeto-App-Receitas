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
import RecipeDetails from './components/RecipeDetails';
// import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      {/* <Route path="*" component={ NotFound } /> */}

    </Switch>

  );
}

export default App;

// Requisito 2/3/5/6/13/20: Aline, Nicola, Camila, Patrick, Samara;
// Requisito 7/8: Patrick;
// Requisito 9: Aline, NIcola, Patrick, Samara;
// Requisito 10: Aline, Camila;
// Requisito 11/12: Aline;
// Requisito 16/18: Aline, Nicola;
// Requisito 17: Nicola;
// Requisito 19: Samara;
