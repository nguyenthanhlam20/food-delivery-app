export const AUTHEN = {
  SIGN_IN: "http://localhost:4000/signin",
  SIGN_UP: "http://localhost:4000/signup",
  FORGOT_PASSWORD: "http://localhost:4000/forgot/password",
};

export const USER_API = {
  GET_USERS: "http://localhost:4000/authen/manage/user/get",
  INSERT_USER: "http://localhost:4000/authen/manage/user/insert",
  DELETE_USER: "http://localhost:4000/authen/manage/user/delete",
  UPDATE_USER: "http://localhost:4000/authen/manage/user/update",
};

export const ROLE = {
  ADMIN: "admin",
  USER: "user",
};

export const CONSTANT_ROUTE = {
  HOME_PAGE: "/",
  SIGN_IN: "/signin",
  SIGN_UP: "/signup",
  FORGOT_PASSWORD: "/password/forgot",
  CHANGE_PASSWORD: "/password/change",
  MANAGE_USER: "/authen/manage/user",
};
