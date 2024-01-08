import Heading from "./Heading";
import { useParams } from "react-router-dom";
let List = () => {
  const { boardsId } = useParams();
  return (
    <>
      <Heading />
      <h1 className="m-5"> ID is : {boardsId}</h1>
    </>
  );
};
export default List;
