import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

function Login() {
  const { email, setEmail, password, setPassword } = useContext(AppContext);

  const [disableStatus, setDisableStatus] = useState(true);

  useEffect(() => {
    const minLength = 6;

    if (((/([a-z])\w+@[a-z]\w+.com/g).test(email)) && password.length > minLength) {
      setDisableStatus(false);
    } else {
      setDisableStatus(true);
    }
  }, [email, password]);

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
      >
        Enter
      </button>
    </div>
  );
}

export default Login;

// requisitos 2-3: Aline, Nicola, Samara, Camila, Patrick
