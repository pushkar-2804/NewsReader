import React from "react";

const NewsList = ({ articles }) => {
  return (
    <div className="news-list">
      {articles.map((article) => (
        <div key={article.id} className="news-item">
          <img src={article.image} alt={article.title} />
          <h2>{article.title}</h2>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
