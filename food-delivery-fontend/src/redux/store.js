import React from "react";
import thunk from "redux-thunk";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authenSlice from "./authenSlice";
import userSlice from "./userSlice";

const rootReducers = combineReducers({
  authen: authenSlice.reducer,
  user: userSlice.reducer,
});

const store = configureStore({
  reducer: rootReducers,
  middleware: [thunk],
});

export default store;
