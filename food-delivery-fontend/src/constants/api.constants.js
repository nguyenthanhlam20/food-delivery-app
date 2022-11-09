export const API = {
  USER: {
    CHANGE_PASSWORD: process.env.REACT_APP_CHANGE_PASSWORD,
    VIEW_PROFILE: process.env.REACT_APP_USER_VIEW_PROFILE,
    UPDATE_PROFILE: process.env.REACT_APP_USER_EDIT_PROFILE,
  },
  AUTHEN: {
    SIGN_IN: process.env.REACT_APP_SIGN_IN,
    SIGN_UP: process.env.REACT_APP_SIGN_UP,
    FORGOT_PASSWORD: process.env.REACT_APP_FORGOT_PASSWORD,
  },
  ADMIN: {
    MANAGE_USER: {
      GET_USERS: process.env.REACT_APP_GET_USERS,
      INSERT_USER: process.env.REACT_APP_INSERT_USER,
      DELETE_USER: process.env.REACT_APP_DELETE_USER,
      UPDATE_USER: process.env.REACT_APP_UPDATE_USER,
    },
    MANAGE_CATEGORY: {
      GET_CATEGORIES: process.env.REACT_APP_GET_CATEGORIES,
      GET_CATEGORY_IMAGES: process.env.REACT_APP_GET_CATEGORY_IMAGES,
      CHANGE_CATEGORY_ACTIVE_STATUS:
        process.env.REACT_APP_CHANGE_CATEGORY_ACTIVE_STATUS,
      INSERT_CATEGORY: process.env.REACT_APP_INSERT_CATEGORY,
      DELETE_CATEGORY: process.env.REACT_APP_DELETE_CATEGORY,
      UPDATE_CATEGORY: process.env.REACT_APP_UPDATE_CATEGORY,
    },
    MANAGE_RESTAURANT: {
      GET_RESTAURANT_BY_ID: process.env.REACT_APP_GET_RESTAURANT_BY_ID,
      GET_RESTAURANTS: process.env.REACT_APP_GET_RESTAURANTS,
      GET_RESTAURANT_IMAGES: process.env.REACT_APP_GET_RESTAURANT_IMAGES,
      CHANGE_RESTAURANT_ACTIVE_STATUS:
        process.env.REACT_APP_CHANGE_RESTAURANT_ACTIVE_STATUS,
      INSERT_RESTAURANT: process.env.REACT_APP_INSERT_RESTAURANT,
      DELETE_RESTAURANT: process.env.REACT_APP_DELETE_RESTAURANT,
      UPDATE_RESTAURANT: process.env.REACT_APP_UPDATE_RESTAURANT,
    },
    MANAGE_FOOD: {
      GET_FOODS: process.env.REACT_APP_GET_FOODS,
      GET_FOOD_IMAGES: process.env.REACT_APP_GET_FOOD_IMAGES,
      INSERT_FOOD: process.env.REACT_APP_INSERT_FOOD,
      DELETE_FOOD: process.env.REACT_APP_DELETE_FOOD,
      UPDATE_FOOD: process.env.REACT_APP_UPDATE_FOOD,
      CHANGE_FOOD_ACTIVE_STATUS:
        process.env.REACT_APP_CHANGE_FOOD_ACTIVE_STATUS,
    },
    MANAGE_CARD: {
      GET_CARDS: process.env.REACT_APP_GET_CARDS,
      INSERT_CARD: process.env.REACT_APP_INSERT_CARD,
    },
    MANAGE_CART: {
      GET_INFO: process.env.REACT_APP_CART_GET_INFO,
      INSERT_FOOD: process.env.REACT_APP_CART_INSERT_FOOD,
      UPDATE_FOOD: process.env.REACT_APP_CART_UPDATE_FOOD,
      DELETE_FOOD: process.env.REACT_APP_CART_DELETE_FOOD,
    },
    MANAGE_BILL: {},
  },
};
