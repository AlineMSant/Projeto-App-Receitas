import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
// import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Meals } />

      {/* <Route path="*" component={ NotFound } /> */}

    </Switch>

  );
}

export default App;
