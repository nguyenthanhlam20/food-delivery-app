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
import { useDispatch, useSelector } from "react-redux";
import { decryptToken } from "./helpers/decryptToken";
import authenSlice from "./redux/authenSlice";

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
  const dispatch = useDispatch();
  const { setUser } = authenSlice.actions;
  let token = useSelector((state) => state.authen.token);
  let user = null;
  if (token === null) {
    token = sessionStorage.getItem("token");
    if (token) {
      user = decryptToken(token);
      dispatch(setUser(user));
    }
  } else {
    user = decryptToken(token);
    dispatch(setUser(user));
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
              <PrivateRoute element={route.component} />
            ) : (
              route.component
            )
          }
          exact={route.exact}
        />
      );
    });
  };

  // console.log("render");

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
          {user?.role === "user" ? <Sidebar user={user} /> : null}
        </OuterWrapper>
      </Router>
    </>
  );
}

export default App;
