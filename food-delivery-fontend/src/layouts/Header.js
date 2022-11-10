import React from "react";

import styled from "styled-components";
import UserHeader from "../components/header/UserHeader";
import AdminHeader from "../components/header/AdminHeader";
import { decryptToken } from "../helpers/decryptToken";

const Header = () => {
  const token = sessionStorage.getItem("token");
  const user = decryptToken(token);

  let header = <UserHeader user={user} />;

  if (user?.role === "admin") {
    header = <AdminHeader user={user} />;
  }

  return <>{header}</>;
};

export default Header;
