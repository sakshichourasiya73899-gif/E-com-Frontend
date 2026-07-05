import { createSlice } from "@reduxjs/toolkit";

const extraSlice = createSlice({
  name: "extra",
  initialState: {
    openedComponent: "Dashboard",
    isNavbarOpened: false,
    isViewProductModalOpened: false,
    isCreateProductModalOpened: false,
    isUpdateProductModalOpened: false,
  },
  reducers: {
    toggleComponent: (state, action) => { },
    toggleNavbar: (state, action) => { },
    toggleNavbar: (state, action) => { },
    toggleNavbar: (state, action) => { },
  },
});

export const { } = extraSlice.actions;

export default extraSlice.reducer;
