import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import AdminHomePage from "../components/home_page/AdminHomePage";
import UserHomePage from "../components/home_page/UserHomePage";
import { decryptToken } from "../helpers/decryptToken";

const HomePage = () => {
  const token = sessionStorage.getItem("token");
  const user = decryptToken(token);
  const [isLoading, setIsLoading] = React.useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  let homePage = <UserHomePage />;
  if (user?.role === "admin") {
    homePage = <AdminHomePage />;
  }

  return <>{isLoading ? <Spin size="large" /> : homePage}</>;
};

export default HomePage;
