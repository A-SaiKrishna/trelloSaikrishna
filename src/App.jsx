import { useEffect, useState } from "react";
import "./App.css";
import Boards from "./Boards";
import UseDrawer from "./UseDrawer";
import Heading from "./Heading";
import Grid from "@mui/material/Unstable_Grid2";
import { fetchData } from "./API";

function App() {
  let [boards, setBoards] = useState([]);

  useEffect(() => {
    fetchData("members", "boards", "659b9be89eb605a395faa7e1").then((data) => {
      if (data instanceof Error) {
        console.error("Error in FetchingBoards ", data.message);
      } else {
        setBoards(data);
      }
    });
  }, []);
  return (
    <>
      <Heading
        adding={(text) => {
          setBoards([...boards, text]);
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
