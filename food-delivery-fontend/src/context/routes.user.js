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
    path: CONSTANT_ROUTE.FOOD_ORDER,
    isPrivate: false,
    component: <Pages.FoodOrder />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.FAVORITE,
    isPrivate: false,
    component: <Pages.Favorite />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.ORDER_HISTORY,
    isPrivate: false,
    component: <Pages.OrderHistory />,
    exact: true,
  },
  {
    path: CONSTANT_ROUTE.BILLS,
    isPrivate: false,
    component: <Pages.Bills />,
    exact: true,
  },
];
