import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsArticles } from "../../utils/Api.js";

export const fetchArticles = createAsyncThunk(
  "news/fetchArticles",
  async () => {
    const articles = await fetchNewsArticles();
    return articles;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    favorites: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const articleIndex = action.payload;
      const existingIndex = state.favorites.findIndex(
        (index) => index === articleIndex
      );
      if (existingIndex === -1) {
        state.favorites.push(articleIndex);
      } else {
        state.favorites.splice(existingIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload;
    });
  },
});

export const { toggleFavorite } = newsSlice.actions;
export default newsSlice.reducer;
