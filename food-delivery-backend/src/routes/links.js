import { CONSTANT_ROUTE } from "../constants";
import UserController from "../controller/UserController";
import CategoryController from "../controller/CategoryController";
import RestaurantController from "../controller/RestaurantController";
import FoodController from "../controller/FoodController";
import CartController from "../controller/CartController";
import OrderController from "../controller/OrderController";
import BillController from "../controller/BillController";
export const Links = [
  {
    route: CONSTANT_ROUTE.SIGN_IN,
    method: "post",
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
    route: CONSTANT_ROUTE.MANAGE_USER + "/get/byusername",
    method: "post",
    handleAction: UserController.getUserByUsername,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_USER + "/insert",
    method: "post",
    handleAction: UserController.getUser,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_USER + "/update",
    method: "post",
    handleAction: UserController.updateUserInfo,
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
    route: CONSTANT_ROUTE.MANAGE_CATEGORY + "/change/status",
    method: "post",
    handleAction: CategoryController.changeActiveStatus,
  },

  ///
  {
    route: CONSTANT_ROUTE.MANAGE_FOOD + "/get",
    method: "get",
    handleAction: FoodController.getFoods,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_FOOD + "/get/images",
    method: "post",
    handleAction: FoodController.getFoodImages,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_FOOD + "/insert",
    method: "post",
    handleAction: FoodController.insertFood,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_FOOD + "/update",
    method: "post",
    handleAction: FoodController.editFood,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_FOOD + "/delete",
    method: "post",
    handleAction: FoodController.deleteFood,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_FOOD + "/change/status",
    method: "post",
    handleAction: FoodController.changeActiveStatus,
  },
  //
  {
    route: CONSTANT_ROUTE.MANAGE_RESTAURANT + "/get",
    method: "get",
    handleAction: RestaurantController.getRestaurants,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_RESTAURANT + "/get/byid",
    method: "post",
    handleAction: RestaurantController.getRestaurantById,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_RESTAURANT + "/get/images",
    method: "post",
    handleAction: RestaurantController.getRestaurantImages,
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
    route: CONSTANT_ROUTE.MANAGE_RESTAURANT + "/change/status",
    method: "post",
    handleAction: RestaurantController.changeActiveStatus,
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

  {
    route: CONSTANT_ROUTE.MANAGE_CART + "/get/info",
    method: "post",
    handleAction: CartController.getCartInfo,
  },

  {
    route: CONSTANT_ROUTE.MANAGE_CART + "/insert/food",
    method: "post",
    handleAction: CartController.insertFood,
  },

  {
    route: CONSTANT_ROUTE.MANAGE_CART + "/update/food",
    method: "post",
    handleAction: CartController.updateFood,
  },

  {
    route: CONSTANT_ROUTE.MANAGE_CART + "/delete/food",
    method: "post",
    handleAction: CartController.deleteFood,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_CART + "/clear",
    method: "post",
    handleAction: CartController.clearCart,
  },

  {
    route: CONSTANT_ROUTE.MANAGE_ORDER + "/get/all",
    method: "get",
    handleAction: OrderController.getAll,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_ORDER + "/get/by/username",
    method: "post",
    handleAction: OrderController.getByUsername,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_ORDER + "/insert",
    method: "post",
    handleAction: OrderController.insertOrder,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_ORDER + "/update",
    method: "post",
    handleAction: OrderController.updateOrder,
  },

  {
    route: CONSTANT_ROUTE.MANAGE_BILL + "/get/all",
    method: "get",
    handleAction: BillController.getAll,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_BILL + "/get/by/username",
    method: "post",
    handleAction: BillController.getByUsername,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_BILL + "/insert",
    method: "post",
    handleAction: BillController.insertBill,
  },
  {
    route: CONSTANT_ROUTE.MANAGE_BILL + "/update",
    method: "post",
    handleAction: BillController.updateBill,
  },
];
