import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { saveEmail,
  saveInProgressRecipes } from '../helpers/LocalStorage';

function Login() {
  const { email, setEmail, password, setPassword } = useContext(AppContext);
  const history = useHistory();
  const [disableStatus, setDisableStatus] = useState(true);

  useEffect(() => {
    const minLength = 6;

    if (((/([a-z])\w+@[a-z]\w+.com/g).test(email)) && password.length > minLength) {
      setDisableStatus(false);
    } else {
      setDisableStatus(true);
    }
  }, [email, password]);

  function handleClick() {
    saveEmail(email);
    saveInProgressRecipes();
    // para getItem JSON.parse(localStorage.getItem('user'));
    history.push('/meals');
  }

  return (
    <div>
      <input
        type="text"
        data-testid="email-input"
        onChange={ (e) => setEmail(e.target.value) }
      />

      <input
        type="password"
        data-testid="password-input"
        onChange={ (e) => setPassword(e.target.value) }

      />

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disableStatus }
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;

// requisitos 2-6: Aline, Nicola, Samara, Camila, Patrick
