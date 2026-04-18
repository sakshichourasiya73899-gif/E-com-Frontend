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
    toggleAuthPopup(state){
      state.isAIPopupOpen=!state.isAuthPopupOpen;
    },
    toggleSidebar(state){
      state.isSidebarOpen=!state.isSidebarOpen
    },
  
    toggleAIModal(state){
      state.isAIPopupOpen=!state.isAIPopupOpen
<<<<<<< HEAD
=======
    },
    toggleSearchBar(state){
      state.isSearchBarOpen=!state.isSearchBarOpen
    },
    toggleCart(state){
      state.isCartOpen=!state.isCartOpen
>>>>>>> f4878f1 (cart and login Panel)
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
