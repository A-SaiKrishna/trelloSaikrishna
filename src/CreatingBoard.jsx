import Button from "@mui/material/Button";
import { useState } from "react";
import { postData } from "./API";
let CreatingBoard = ({ adding }) => {
  const [boardName, setBoardName] = useState("");
  const [display, setDisplay] = useState({ display: "none" });
  const handleInputChange = (event) => {
    setBoardName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log("Board Name:", boardName);
    postData("boards", boardName).then((text) => {
      if (text instanceof Error) {
        console.error("Error in posting a board ", text.message);
      }
      // console.log(text);
      else {
        adding(text);
      }
    });
    setBoardName("");
    setDisplay({ display: "none" });
  };

  return (
    <>
      <div>
        <Button
          variant="contained"
          onClick={() => {
            setDisplay({ display: "block" });
          }}
        >
          Create a Board
        </Button>
        <div style={display}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={boardName}
              onChange={handleInputChange}
              placeholder="Enter Board Name"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
};
export default CreatingBoard;
