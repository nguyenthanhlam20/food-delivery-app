import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import AdminHomePage from "../components/home_page/AdminHomePage";
import UserHomePage from "../components/home_page/UserHomePage";

const HomePage = () => {
  const user = useSelector((state) => state.authen.user);

  const [isLoading, setIsLoading] = React.useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  let homePage;
  if (user?.role === "admin") {
    homePage = <AdminHomePage />;
  } else {
    homePage = <UserHomePage />;
  }

  return <>{isLoading ? <Spin size="large" /> : homePage}</>;
};

export default HomePage;
