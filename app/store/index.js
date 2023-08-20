import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/AuthSlice";
import favoritesReducer from "./slices/FavouriteSlice";

const store = configureStore({
  reducer: {
    // auth: authReducer,
    favorites: favoritesReducer,
  },
});

export default store;
