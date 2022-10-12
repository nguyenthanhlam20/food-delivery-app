import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserHeader from "../../components/header/UserHeader";
import AdminNavbar from "../../components/navbar/admin/AdminNavbar";
import { UserList } from "../../features/manage/user/UserList";
import { getUsers } from "../../redux/userSlice";

const UserPage = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      <UserHeader />
      <AdminNavbar />
      <UserList users={users} />
    </>
  );
};

export default UserPage;
