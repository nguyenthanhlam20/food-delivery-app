import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListUser } from "../../features/manage/user/ListUser";
import { getUsers } from "./../../redux/userSlice";

const ListUserPage = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.data);

  React.useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      <ListUser users={users} />
    </>
  );
};

export default ListUserPage;
