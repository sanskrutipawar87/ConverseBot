import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  loginId: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;