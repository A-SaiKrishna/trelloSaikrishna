import Heading from "./Heading";
import { useParams } from "react-router-dom";
import EachList from "./EachList";
import UseDrawer from "./UseDrawer";
import { Grid } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fetchData, postDataWithId, getBoard } from "./API";
import { useDispatch, useSelector } from "react-redux";
import { createLists, addLists } from "./features/listSlice";
let List = () => {
  let [bg, setBg] = useState("white");
  let [bgImg, setBgImg] = useState("");
  const { boardsId } = useParams();
  let [addList, setAddList] = useState(false);
  let listSelector = useSelector((state) => state.List.lists);
  let listDispatch = useDispatch();
  const inputedValue = useRef("");
  useEffect(() => {
    fetchData("boards", "lists", boardsId).then((data) => {
      if (data instanceof Error) {
        console.log("Error while fetching the list ", data.message);
      } else {
        // setListBoard(data);
        listDispatch(createLists(data));
      }
    });
    getBoard(boardsId).then((data) => {
      if (data instanceof Error) {
        console.error("error while getting board details ", data.message);
      } else {
        if (data.prefs.backgroundColor === null) {
          if (data.prefs.backgroundImage != null) {
            setBgImg(data.prefs.backgroundImage);
          }
        } else {
          setBg(data.prefs.backgroundColor);
        }
      }
    });
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: bg,
          backgroundImage: `URL(${bgImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Heading />
        <Grid container>
          <Grid item xs={2}>
            <UseDrawer />
          </Grid>
          <Grid item xs={10}>
            <Box
              display={"flex"}
              sx={{
                paddingTop: "5rem",
                flex: "1",
                width: "100%",
                // height: "100vh",
              }}
            >
              {listSelector &&
                listSelector.map((obj) => (
                  <div key={obj.id}>
                    <EachList
                      object={obj}
                      sx={{ flexGrow: 1, flexShrink: 0 }}
                      key={obj.id}
                    />
                  </div>
                ))}
              {addList ? (
                <Card sx={{ width: 300, marginRight: "1.5rem", flexShrink: 0 }}>
                  <CardContent>
                    <TextField
                      size="small"
                      label="Enter list title"
                      onChange={(e) => {
                        inputedValue.current = e.target.value;
                      }}
                    />
                  </CardContent>
                  <CardActions sx={{ flexShrink: 0 }}>
                    <Button
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        setAddList(!addList);
                        if (inputedValue.current)
                          postDataWithId("lists", {
                            idBoard: boardsId,
                            name: inputedValue.current,
                          }).then((data) => {
                            if (data instanceof Error) {
                              console.log(
                                "error while posting list ",
                                data.message
                              );
                            } else {
                              // setListBoard([...listBoard, data]);
                              listDispatch(addLists(data));
                            }
                          });
                      }}
                      sx={{ flexShrink: 0 }}
                    >
                      Add list
                    </Button>
                    <Button
                      onClick={() => {
                        setAddList(!addList);
                      }}
                    >
                      <CloseIcon />
                    </Button>
                  </CardActions>
                </Card>
              ) : (
                <Button
                  sx={{ height: "3rem", flexShrink: 0, marginRight: 3 }}
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setAddList(!addList);
                  }}
                >
                  Add another list
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default List;
