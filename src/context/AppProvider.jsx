import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import AppContext from './AppContext';

export function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const context = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
  }), [email, password]);

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>

  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
