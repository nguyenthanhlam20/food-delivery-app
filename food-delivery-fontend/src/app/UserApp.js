// import './App.css';
import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Header from "./layouts/Header";

import { routes } from "./context/routes";
import Navbar from "./layouts/Navbar";
import styled from "styled-components";
import Footer from "./layouts/Footer.";
import Sidebar from "./layouts/Sidebar";
import { SignInPage } from "./pages";
import { useSelector } from "react-redux";

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
const InnerWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PrivateRoute = ({ element }) => {
  const token = sessionStorage.getItem("token");

  return token ? element : <Navigate to="/signin" />;
};

function App() {
  let token = useSelector((state) => state.authen.token);

  if (token === null) {
    token = sessionStorage.getItem("token");
  }
  const [isRefresh, setIsRefresh] = React.useState(false);

  const renderRoute = () => {
    return routes.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.isPrivate ? (
              <PrivateRoute element={route.element} />
            ) : (
              route.component
            )
          }
          exact={route.exact}
        />
      );
    });
  };

  console.log("render");

  React.useEffect(() => {
    setIsRefresh(true);
  }, [token]);

  const [loading, setLoading] = React.useState(true);

  return (
    <>
      <Router>
        <OuterWrapper>
          {token ? <Navbar /> : null}
          <InnerWrapper>
            {token ? <Header /> : null}
            <Routes>{renderRoute()}</Routes>
            {/* <Footer /> */}
          </InnerWrapper>
          {token ? <Sidebar /> : null}
        </OuterWrapper>
      </Router>
    </>
  );
}

export default App;
