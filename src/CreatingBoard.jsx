import Button from "@mui/material/Button";
import { useState } from "react";
let CreatingBoard = ({ adding }) => {
  function postFetch(name) {
    return fetch(
      `https://api.trello.com/1/boards/?name=${name}&key=0def6d06d0c8bdc9b4ba01ce32bb84e2&token=ATTAe49ee4294a50ca5bba47c3ef83962ffefc20eea871c3add5192916219ec985830D59F94C`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => text)
      .catch((err) => console.error(err));
  }
  const [boardName, setBoardName] = useState("");
  const [display, setDisplay] = useState({ display: "none" });
  const handleInputChange = (event) => {
    setBoardName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log("Board Name:", boardName);
    postFetch(boardName).then((text) => {
      // console.log(text);
      adding(JSON.parse(text));
    });
    setBoardName("");
    setDisplay({ display: "none" });
  };

  return (
    <>
      <div
      // onMouseLeave={() => {
      //   setDisplay({ display: "none" });
      // }}
      >
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
