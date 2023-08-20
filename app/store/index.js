import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./slices/FavouriteSlice";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;
