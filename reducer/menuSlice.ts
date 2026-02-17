"use client";

import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
  },
  reducers: {
    setMenuItems(state, action) {
      state.items = action.payload;
    },
    hydrateFromStorage(state) {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("menu_items");
        state.items = raw ? JSON.parse(raw) : [];
      }
    },
  },
});

export const { setMenuItems, hydrateFromStorage } = menuSlice.actions;

export default menuSlice.reducer;
