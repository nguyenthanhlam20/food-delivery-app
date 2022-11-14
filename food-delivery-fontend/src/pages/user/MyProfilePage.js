import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getUserByUsername, updateUserInfo } from "../../redux/userSlice";
import Profile from "../../components/profile/Profile";

const MyProfilePage = () => {
  const username = useSelector((state) => state.authen.user.username);
  const isRefresh = useSelector((state) => state.user.isRefresh);
  const user = useSelector((state) => state.user.singleUser);
  //   console.log("username", isRefresh);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserByUsername({ username: username }));
  }, []);

  return (
    <>
      <Profile user={user} />
    </>
  );
};

export default MyProfilePage;
