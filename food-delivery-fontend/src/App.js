// import './App.css';
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";

import { routes } from "./context/routes";
import Navbar from "./layouts/Navbar";
import styled from "styled-components";

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  max-width: 100%;
`;
const InnerWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

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
        <OuterWrapper>
          <Navbar />
          <InnerWrapper>
            <Header />
            <Routes>{renderRoute()}</Routes>
          </InnerWrapper>
        </OuterWrapper>
      </Router>
    </>
  );
}

export default App;
