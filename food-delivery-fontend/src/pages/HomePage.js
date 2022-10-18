import React from "react";
import { useSelector } from "react-redux";
import {
  AdminHomePage,
  PublicHomePage,
  UserHomePage,
} from "../components/home_page";

const HomePage = () => {
  const user = useSelector((state) => state.authen.user);
  let homePage;
  if (user?.username) {
  } else {
    homePage = <UserHomePage />;
  }

  homePage = <AdminHomePage />;

  return <>{homePage}</>;
};

export default HomePage;
