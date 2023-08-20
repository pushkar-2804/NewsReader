import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/slices/FavouriteSlice";

const NewsList = ({ articles }) => {
  // const auth = useAuth(); // Firebase authentication hook

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(currentUser => {
  //     setUser(currentUser);
  //   });

  //   return () => unsubscribe();
  // }, [auth]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser("Pushkar");
  }, []);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  const handleFavorite = ({ article, id }) => {
    console.log(article, id);
    const isFavorited = favorites.some((fav) => fav.id === id);
    console.log(isFavorited);
    if (isFavorited) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  // const handleFavorite = async (article) => {
  // if (!user) {
  //   console.log('User not logged in');
  //   return;
  // }
  // try {
  //   // Check if the article is already a favorite
  //   const userDoc = await firestore.collection('users').doc(user.uid).get();
  //   const favorites = userDoc.data().favorites || [];
  //   if (favorites.some(fav => fav.id === article.id)) {
  //     console.log('Article is already a favorite');
  //     return;
  //   }
  //   // Add the article to the user's favorites
  //   await firestore.collection('users').doc(user.uid).update({
  //     favorites: [...favorites, article],
  //   });
  //   console.log('Article added to favorites');
  // } catch (error) {
  //   console.error('Error adding article to favorites:', error);
  // }
  // };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {articles.map((article, id) => (
        <div key={id} className="border p-4 rounded-md">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="mb-2 rounded-md"
          />
          <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
          <p className="text-gray-700">{article.description}</p>
          {user ? (
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
              onClick={() => handleFavorite({ article, id })}
            >
              {favorites.some((fav) => fav.id === id)
                ? "Unfavorite"
                : "Favorite"}
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
