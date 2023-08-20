import React, { useEffect, useState } from "react";

const NewsGrid = ({ articles }) => {
  const [user, setUser] = useState(null);

  // const auth = useAuth(); // Firebase authentication hook

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(currentUser => {
  //     setUser(currentUser);
  //   });

  //   return () => unsubscribe();
  // }, [auth]);
  useEffect(() => {
    setUser("Pushkar");
  }, []);

  return (
    <div className="news-grid">
      {articles.map((article, index) => (
        <div key={index} className="news-item">
          <img src={article.urlToImage} alt={article.title} />
          <h2>{article.title}</h2>
          {user ? (
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
              onClick={() => handleFavorite(article)}
            >
              Favorite
            </button>
          ) : (
            <p className="mt-2 text-gray-600">Log in to favorite articles</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
