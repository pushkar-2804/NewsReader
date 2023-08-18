import React from "react";

const NewsGrid = ({ articles }) => {
  return (
    <div className="news-grid">
      {articles.map((article) => (
        <div key={article.id} className="news-item">
          <img src={article.image} alt={article.title} />
          <h2>{article.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
