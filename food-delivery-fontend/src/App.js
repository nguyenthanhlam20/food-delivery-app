// import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ROUTES } from "./context/routes";
import * as Pages from "./pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME_PAGE} element={<Pages.HomePage />} />
          <Route path={ROUTES.SIGN_IN} element={<Pages.SignInPage />} />
          <Route path={ROUTES.SIGN_UP} element={<Pages.SignUpPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
