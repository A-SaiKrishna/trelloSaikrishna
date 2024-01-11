import EachCard from "./EachCard";

import { useState, useEffect } from "react";
let UserCard = ({ cardData, updatingCardData }) => {
  return (
    cardData &&
    cardData.map((obj) => {
      return <EachCard obj={obj} updatingCardData={updatingCardData} />;
    })
  );
};
export default UserCard;
