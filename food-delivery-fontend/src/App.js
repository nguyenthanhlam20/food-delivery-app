// import './App.css';
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";

import { routes } from "./context/routes";
import Navbar from "./layouts/Navbar";

function App() {
  const renderRoute = () => {
    return routes.map((route) => {
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
        <Header />
        <Navbar />
        <Routes>{renderRoute()}</Routes>
      </Router>
    </>
  );
}

export default App;
