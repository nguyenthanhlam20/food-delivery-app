import React from "react";
import thunk from "redux-thunk";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authenSlice from "./authenSlice";
import userSlice from "./userSlice";
import categorySlice from "./categorySlice";
import restaurantSlice from "./restaurantSlice";
import foodSlice from "./foodSlice";
import cartSlice from "./CartSlice";
import orderSlice from "./orderSlice";
import billSlice from "./billSlice";

const rootReducers = combineReducers({
  authen: authenSlice.reducer,
  user: userSlice.reducer,
  category: categorySlice.reducer,
  restaurant: restaurantSlice.reducer,
  food: foodSlice.reducer,
  cart: cartSlice.reducer,
  order: orderSlice.reducer,
  bill: billSlice.reducer,
});

const store = configureStore({
  reducer: rootReducers,
  middleware: [thunk],
});

export default store;
