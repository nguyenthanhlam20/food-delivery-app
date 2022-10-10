// import './App.css';
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as Pages from "./pages";

import { ROUTES } from "./context/routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME_PAGE} element={<Pages.HomePage />} />
          <Route path={ROUTES.SIGN_IN} element={<Pages.SignInPage />} />
          <Route path={ROUTES.SIGN_UP} element={<Pages.SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
