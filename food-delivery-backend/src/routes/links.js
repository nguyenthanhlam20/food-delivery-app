import { CONSTANT_ROUTE } from "../constants";
import UserController from "../controller/UserController";
import CategoryController from "../controller/CategoryController";
import RestaurantController from "../controller/RestaurantController";
export const Links = [
  {
    route: CONSTANT_ROUTE.SIGN_IN,
    method: "get",
    handleAction: UserController.getUser,
  },
  {
    route: CONSTANT_ROUTE.SIGN_UP,
    method: "post",
    handleAction: UserController.insertUser,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_USER + "/get",
    method: "get",
    handleAction: UserController.getUser,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_USER + "/insert",
    method: "post",
    handleAction: UserController.getUser,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_USER + "/delete",
    method: "post",
    handleAction: UserController.getUser,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_CATEGORY + "/get",
    method: "get",
    handleAction: CategoryController.getCategories,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_CATEGORY + "/get/images",
    method: "post",
    handleAction: CategoryController.getCategoryImages,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_CATEGORY + "/insert",
    method: "post",
    handleAction: CategoryController.insertCategory,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_CATEGORY + "/update",
    method: "post",
    handleAction: CategoryController.updateCategory,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_CATEGORY + "/delete",
    method: "post",
    handleAction: CategoryController.deleteCategory,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_RESTAURANT + "/get",
    method: "get",
    handleAction: RestaurantController.getRestaurants,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_RESTAURANT + "/get/images",
    method: "get",
    handleAction: RestaurantController.getRestaurants,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_RESTAURANT + "/insert",
    method: "post",
    handleAction: RestaurantController.insertRestaurant,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_RESTAURANT + "/update",
    method: "post",
    handleAction: RestaurantController.updateRestaurant,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_RESTAURANT + "/delete",
    method: "post",
    handleAction: RestaurantController.deleteRestaurant,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_RESTAURANT + "/change/status",
    method: "post",
    handleAction: RestaurantController.changeRestaurantStatus,
  },
];
