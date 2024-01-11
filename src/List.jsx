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
import { fetchData, postDataWithId } from "./API";
let List = () => {
  const { boardsId } = useParams();
  let [addList, setAddList] = useState(false);
  const [listBoard, setListBoard] = useState([]);
  const inputedValue = useRef("");
  useEffect(() => {
    fetchData("boards", "lists", boardsId).then((data) => {
      if (data instanceof Error) {
        console.log("Error while fetching the list ", data.message);
      } else {
        setListBoard(data);
      }
    });
  }, []);

  return (
    <>
      <div>
        <Heading />
        <Grid container>
          <Grid item xs={2}>
            <UseDrawer />
          </Grid>
          <Grid item xs={10}>
            <Box
              display="flex"
              flexDirection="row"
              sx={{ paddingTop: "5rem", flex: "1", width: "1000%" }}
            >
              {listBoard.map((obj) => (
                <EachList object={obj} />
              ))}
              {addList ? (
                <Card sx={{ width: 300, marginRight: "1.5rem" }}>
                  <CardContent>
                    <TextField
                      size="small"
                      label="Enter list title"
                      onChange={(e) => {
                        inputedValue.current = e.target.value;
                      }}
                    />
                  </CardContent>
                  <CardActions>
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
                              setListBoard([...listBoard, data]);
                            }
                          });
                      }}
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
                  sx={{ height: "3rem" }}
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
