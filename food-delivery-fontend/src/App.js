// import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserHeader } from "./components/header";

import { routes } from "./context/routes";

function App() {
  const renderRoute = () => {
    return routes.map((route) => {
      // console.log(route);
      return (
        <Route
          key={route.path}
          path={route.path}
          element={route.component}
          exact={route.exact}
        />
      );
    });
  };

  return (
    <>
      <Router>
        {/* <UserHeader /> */}
        <Routes>{renderRoute()}</Routes>
      </Router>
    </>
  );
}

export default App;
