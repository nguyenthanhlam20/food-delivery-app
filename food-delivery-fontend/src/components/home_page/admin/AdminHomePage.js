import React from "react";
import { AdminNavbar } from "../../navbar";
import "./AdminHomePage.scss";
import { UserHeader } from "../../header";

const AdminHomePage = () => {
  return (
    <>
      <div className="">
        <UserHeader />
        <AdminNavbar />
      </div>
    </>
  );
};

export default AdminHomePage;
