import React from 'react';

const AuthContext = React.createContext({
  user: undefined,
  authToken: undefined,
  updateUser: () => undefined,
  onLogin: () => undefined,
  onLogout: () => undefined
});

export default AuthContext;
