import React from "react";

const NewsGrid = ({ articles }) => {
  return (
    <div className="news-grid">
      {articles.map((article, index) => (
        <div key={index} className="news-item">
          <img src={article.urlToImage} alt={article.title} />
          <h2>{article.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
