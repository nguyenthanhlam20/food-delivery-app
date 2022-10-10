import React from "react";
import thunk from "redux-thunk";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authenSlice from "./authenSlice";

const rootReducers = combineReducers({
  authen: authenSlice.reducer,
});

const store = configureStore({
  reducer: rootReducers,
  middleware: [thunk],
});

export default store;
