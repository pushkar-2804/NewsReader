// components/NewsList.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth, useFirestore } from "../utils/Firebase";
import { addFavorite } from "../store/slices/FavouriteSlice";

const NewsList = ({ articles }) => {
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const favorites = useSelector((state) => state.favorites.articles);
  // const user = useSelector((state) => state.auth.user);
  const auth = useAuth();
  const user = auth.user;
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    console.log("User logged in:", user);
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  const handleFavorite = async ({ article, index }) => {
    if (!loggedIn) {
      console.log("User not logged in");
      return;
    }

    // Check if the article is already a favorite
    if (favorites?.some((fav) => fav.id === index)) {
      console.log("Article is already a favorite");
      return;
    }

    try {
      // Add the article to the user's favorites in Redux
      dispatch(addFavorite(article));

      // Update the user's favorites in Firestore
      await firestore
        .collection("users")
        .doc(user.uid)
        .update({
          favorites: [...favorites, article],
        });

      console.log("Article added to favorites");
    } catch (error) {
      console.error("Error adding article to favorites:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {articles.map((article, index) => (
        <div key={index} className="border p-4 rounded-md">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="mb-2 rounded-md"
          />
          <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
          <p className="text-gray-700">{article.description}</p>
          {loggedIn ? (
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
              onClick={() => handleFavorite({ article, index })}
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

export default NewsList;
