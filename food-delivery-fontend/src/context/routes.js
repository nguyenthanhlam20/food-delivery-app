import React from "react";
import * as Pages from "../pages";
import { CONSTANT_ROUTE } from "../constants";

// const CONSTANT_ROUTE = React.lazy(() => import("../constants"));
// console.log(React.lazy(() => import("../pages")));

export const routes = [
  {
    path: CONSTANT_ROUTE.HOME_PAGE,
    isPrivate: false,
    component: <Pages.HomePage />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.SIGN_IN,
    isPrivate: false,
    component: <Pages.SignInPage />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.SIGN_UP,
    isPrivate: false,
    component: <Pages.SignUpPage />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.MANAGE_USER,
    isPrivate: false,
    component: <Pages.ListUserPage />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.MANAGE_RESTAURANT,
    isPrivate: false,
    component: <Pages.ListRestaurantPage />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.MANAGE_CATEGORY,
    isPrivate: false,
    component: <Pages.ListCategoryPage />,
    exact: true,
  },
];
