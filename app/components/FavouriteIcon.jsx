import React from "react";

const FavoriteIcon = ({ isFavorite, onClick }) => {
  return (
    <span
      className={`favorite-icon ${isFavorite ? "favorite" : ""}`}
      onClick={onClick}
    >
      ❤️
    </span>
  );
};

export default FavoriteIcon;
