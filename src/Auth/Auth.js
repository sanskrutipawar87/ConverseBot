import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import AuthContext from "./AuthContext";
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";

const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginId, setLoginId] = useState(null);

  const setLogin = (id) => {
    setIsLoggedIn(true);
    setLoginId(id);
  };

  const contextValue = {
    isLoggedIn,
    loginId,
    setLogin,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <HashRouter>
        <Routes>
          {isLoggedIn ? (
            <Route path="/*" element={<MainRoutes />} />
          ) : (
            <Route path="/*" element={<AuthRoutes />} />
          )}
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default Auth;
