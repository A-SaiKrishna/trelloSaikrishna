import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Boards from "./Boards";
import UseDrawer from "./UseDrawer";
import Heading from "./Heading";
import Grid from "@mui/material/Unstable_Grid2";

// let createRouter = createBrowserRouter([{
//   path:"/",
//   element:<App/>,
//   children:[
//     {path:"/",
//      element:
//   }
//   ]
// }]);

function App() {
  let [boards, setBoards] = useState([]);
  let [boardAdding, setBoardAdding] = useState(false);
  async function fetchingBoards() {
    let response = await fetch(
      "https://api.trello.com/1/members/659b9be89eb605a395faa7e1/boards?key=0def6d06d0c8bdc9b4ba01ce32bb84e2&token=ATTA5d110c6193b3e78f62ffa38ba735c4130def7b4fa63fda497f959b3ab3c192f93B960E13"
    );
    let data = await response.json();
    return data;
  }
  useEffect(() => {
    fetchingBoards().then((data) => {
      setBoards(data);
    });
  }, [boardAdding]);
  return (
    <>
      <Heading
        adding={() => {
          setBoardAdding(!boardAdding);
        }}
      />

      <Grid container spacing={2} sx={{ paddingTop: "1rem" }}>
        <Grid item xs={3}>
          <UseDrawer />
        </Grid>
        <Grid item xs={9}>
          <Boards data={boards} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
