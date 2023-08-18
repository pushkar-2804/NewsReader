import React from "react";

const NewsDetail = ({ article }) => {
  return (
    <div className="news-detail">
      <h2>{article.title}</h2>
      <img src={article.image} alt={article.title} />
      <p>{article.description}</p>
      <p>Show more</p>
      {/* Add link in  the above line */}
    </div>
  );
};

export default NewsDetail;
