import EachCard from "./EachCard";

import { useState, useEffect } from "react";
let UserCard = ({ cardData, deleteCard }) => {
  return (
    cardData &&
    cardData.map((obj) => {
      return <EachCard obj={obj} deleteCard={deleteCard} />;
    })
  );
};
export default UserCard;
