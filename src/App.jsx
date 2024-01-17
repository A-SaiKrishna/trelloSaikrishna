import { useEffect, useState } from "react";
import "./App.css";
import Boards from "./Boards";
import UseDrawer from "./UseDrawer";
import Heading from "./Heading";
import Grid from "@mui/material/Unstable_Grid2";
import { fetchData } from "./API";
import { useDispatch } from "react-redux";
import { addBoard, createBoard } from "./features/boardsSlice";
import { useSelector } from "react-redux";

function App() {
  let boardDispatch = useDispatch();
  let boardSelector = useSelector((state) => state.Board.boards);

  useEffect(() => {
    fetchData("members", "boards", "659b9be89eb605a395faa7e1").then((data) => {
      if (data instanceof Error) {
        console.error("Error in FetchingBoards ", data.message);
      } else {
        boardDispatch(createBoard(data));
      }
    });
  }, []);
  return (
    <>
      <Heading
        adding={(text) => {
          boardDispatch(addBoard(text));
        }}
      />

      <Grid container spacing={2} sx={{ paddingTop: "1rem" }}>
        <Grid item xs={3}>
          <UseDrawer />
        </Grid>
        <Grid item xs={9}>
          <Boards data={boardSelector} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
