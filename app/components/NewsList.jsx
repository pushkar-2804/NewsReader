// components/NewsList.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth, useFirestore } from "../utils/Firebase";
import {
  addFavorite,
  removeFavorite,
  setFavorites,
} from "../store/slices/FavouriteSlice";
import ArticleCard from "./ArticleCard";

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
        <ArticleCard
          key={article.url}
          article={article}
          loggedIn={loggedIn}
          isFavorite={isArticleFavorite(article)}
          handleFavorite={handleFavorite}
        />
      ))}
    </div>
  );
};

export default NewsList;
