// components/ArticleCard.js
import React from "react";

const ArticleCard = ({ article, isFavorite, handleFavorite, loggedIn }) => {
  const handleViewMore = () => {
    console.log("View more clicked");
  };
  return (
    <div className="border p-4 rounded-md">
      <img
        src={article.urlToImage}
        alt={article.title}
        className="mb-2 rounded-md mx-auto cursor-pointer"
        onClick={handleViewMore}
      />
      <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
      <p className="text-gray-700">{article.description}</p>
      {loggedIn ? (
        <button
          className={`mt-2 ${
            isFavorite
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white py-1 px-4 rounded`}
          onClick={() => handleFavorite(article)}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      ) : (
        <p className="text-red-500">Please login to favorite</p>
      )}
    </div>
  );
};

export default ArticleCard;
