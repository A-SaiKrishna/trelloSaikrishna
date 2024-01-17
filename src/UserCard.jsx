import EachCard from "./EachCard";

let UserCard = ({ cardData, updatingCardData }) => {
  // console.log(cardData);
  return (
    cardData &&
    cardData.map((obj) => {
      return <EachCard obj={obj} updatingCardData={updatingCardData} />;
    })
  );
};
export default UserCard;
