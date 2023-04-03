import React, { useContext } from 'react';
import AppContext from '../context/AppContext';


function Login() {
  const { email, setEmail, password, setPassword } = useContext(AppContext);

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
      >
        Enter
      </button>
    </div>
  );
}

export default Login;

// requisitos 2-3: Aline, Nicola, Samara, Camila, Patrick
