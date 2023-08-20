// pages/index.js
import React, { useEffect, useState } from "react";

import NewsList from "../components/NewsList";
import NewsGrid from "../components/NewsGrid";
import { fetchNewsArticles } from "../utils/Api";

const HomePage = () => {
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
  );
};

export default HomePage;
