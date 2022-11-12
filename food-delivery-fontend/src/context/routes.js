import React from "react";
import * as Pages from "../pages";
import { CONSTANT_ROUTE } from "../constants";

// const CONSTANT_ROUTE = React.lazy(() => import("../constants"));
// console.log(React.lazy(() => import("../pages")));

export const routes = [
  {
    path: CONSTANT_ROUTE.HOME_PAGE,
    isPrivate: true,
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
    isPrivate: true,
    component: <Pages.ListUserPage />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.MANAGE_RESTAURANT,
    isPrivate: true,
    component: <Pages.ListRestaurantPage />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.MANAGE_CATEGORY,
    isPrivate: true,
    component: <Pages.ListCategoryPage />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.MANAGE_FOOD,
    isPrivate: true,
    component: <Pages.ListFoodPage />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.INSERT_RESTAURANT,
    isPrivate: true,
    component: <Pages.InsertRestaurantPage />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.EDIT_RESTAURANT,
    isPrivate: true,
    component: <Pages.EditRestaurantPage />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.FOOD_LIST,
    isPrivate: true,
    component: <Pages.FoodList />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.FAVORITE,
    isPrivate: true,
    component: <Pages.Favorite />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.ORDER_HISTORY,
    isPrivate: true,
    component: <Pages.OrderHistory />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.BILLS,
    isPrivate: true,
    component: <Pages.Bills />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.MANAGE_ORDER,
    isPrivate: true,
    component: <Pages.ListOrderPage />,
    exact: true,
  },
];
