import React from "react";

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: "",
    error: "",
  },
  reducers: [],
  extraReducers,
});
