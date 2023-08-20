import React from "react";

const NewsList = ({ articles }) => {
  console.log(articles);
  return (
    <div className="news-list">
      {articles.map((article, index) => (
        <div key={index} className="news-item">
          <img src={article.urlToImage} alt={article.title} />
          <h2>{article.title}</h2>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
