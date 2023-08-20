// pages/index.js
"use client";
import React, { useEffect, useState } from "react";
import { fetchNewsArticles } from "./utils/Api";
import NewsGrid from "./components/NewsGrid";
import NewsList from "./components/NewsList";
import { Provider } from "react-redux";
import store from "./store";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const fetchedArticles = await fetchNewsArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching news articles:", error);
      }
    }

    fetchArticles();
  }, []);

  return (
    <Provider store={store}>
      <div>
        <h1>Latest News</h1>
        <button onClick={() => setIsGridView(!isGridView)}>
          {isGridView ? "Switch to List View" : "Switch to Grid View"}
        </button>
        {isGridView ? (
          <NewsGrid articles={articles} />
        ) : (
          <NewsList articles={articles} />
        )}
      </div>
    </Provider>
  );
};

export default Home;
