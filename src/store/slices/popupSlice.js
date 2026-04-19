import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isAuthPopupOpen: false,
    isSidebarOpen: false,
    isSearchBarOpen: false,
    isCartOpen: false,
    isAIPopupOpen: false,
  },
  reducers: {
    toggleAuthPopup(state) {
      state.isAuthPopupOpen = !state.isAuthPopupOpen;
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen
    },

    toggleAIModal(state) {
      state.isAIPopupOpen = !state.isAIPopupOpen

    },
    toggleSearchBar(state) {
      state.isSearchBarOpen = !state.isSearchBarOpen
    },
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen

    }
  },
});

export const {
  toggleAuthPopup,
  toggleSidebar,
  toggleSearchBar,
  toggleCart,
  toggleAIModal,
} = popupSlice.actions;
export default popupSlice.reducer;
