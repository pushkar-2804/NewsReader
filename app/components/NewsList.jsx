// components/NewsList.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth, useFirestore } from "../utils/Firebase";
import {
  addFavorite,
  removeFavorite,
  setFavorites,
} from "../store/slices/FavouriteSlice";

const NewsList = ({ articles }) => {
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const favorites = useSelector((state) => state.favorites.favorites);
  console.log("Favorites:", favorites);
  const auth = useAuth();
  const user = auth.user;
  const [loggedIn, setLoggedIn] = useState(false);

  const fetchUserFavorites = async () => {
    if (!user) {
      return;
    }

    try {
      const userDocRef = firestore.collection("users").doc(user.uid);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const userFavorites = userDoc.data().favorites || [];
        dispatch(setFavorites(userFavorites));
      }
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };

  useEffect(() => {
    fetchUserFavorites();
  }, [user]);

  const handleFavorite = async (article) => {
    if (!user) {
      console.log("User not logged in");
      return;
    }

    try {
      // Check if the user's document exists
      const userDocRef = firestore.collection("users").doc(user.uid);
      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
        await userDocRef.set({ favorites: [article] });
      } else {
        const userFavorites = userDoc.data().favorites || [];
        // Check if the article is already a favorite
        if (isArticleFavorite(article)) {
          const updatedFavorites = userFavorites.filter(
            (fav) => fav.url !== article.url
          );
          await userDocRef.update({
            favorites: updatedFavorites,
          });
          dispatch(removeFavorite(article));
        } else {
          await userDocRef.update({
            favorites: [...userFavorites, article],
          });
          dispatch(addFavorite(article));
        }
      }

      console.log("Article added to favorites");
    } catch (error) {
      console.error("Error adding article to favorites:", error);
    }
  };
  const isArticleFavorite = (article) => {
    return favorites.some((fav) => fav.url === article.url);
  };

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  return (
    <div className="grid grid-cols-1 gap-4">
      {articles.map((article) => (
        <div key={article.url} className="border p-4 rounded-md">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="mb-2 rounded-md"
          />
          <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
          <p className="text-gray-700">{article.description}</p>
          {loggedIn ? (
            <button
              className={`mt-2 ${
                isArticleFavorite(article)
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white py-1 px-4 rounded`}
              onClick={() => handleFavorite(article)}
            >
              {isArticleFavorite(article) ? "Unfavorite" : "Favorite"}
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
