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
// import { Button } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { APITOKEN, APIKEY } from "./ApiInfo";
let List = () => {
  function archieveList(id) {
    // console.log(id);
    fetch(
      `https://api.trello.com/1/lists/${id}/archiveAllCards?key=${APIKEY}&token=${APITOKEN}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => {
        // setListBoard(listBoard.filter((obj) => obj.id != id));

        console.log(text);
      })
      .catch((err) => console.error(err));
  }
  //   let [newDataAdded, setNewDataAdded] = useState(true);
  const { boardsId } = useParams();
  let [addList, setAddList] = useState(false);
  const [listBoard, setListBoard] = useState([]);
  const inputedValue = useRef("");
  //   console.log(boardsId);
  async function fetchingList() {
    let response = await fetch(
      `https://api.trello.com/1/boards/${boardsId}/lists?key=0def6d06d0c8bdc9b4ba01ce32bb84e2&token=ATTAe49ee4294a50ca5bba47c3ef83962ffefc20eea871c3add5192916219ec985830D59F94C`
    );
    let data = await response.json();
    // console.log(data);
    return data;
  }
  function postList() {
    if (inputedValue.current.length != 0) {
      fetch(
        `https://api.trello.com/1/lists?name=${inputedValue.current}&idBoard=${boardsId}&key=${APIKEY}&token=${APITOKEN}`,
        { method: "POST" }
      )
        .then((response) => {
          return response.text();
        })
        .then((text) => {
          //   console.log(text);
          setListBoard([...listBoard, JSON.parse(text)]);
        })
        .catch((err) => console.log(err));
    }
  }
  useEffect(() => {
    fetchingList().then((data) => {
      setListBoard(data);
    });
  }, []);

  //   let [showText, setShowText] = useState(false);

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
                <EachList object={obj} archieveList={archieveList} />
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
                      // sx={{ height: "50px" }}
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        setAddList(!addList);
                        postList();
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
