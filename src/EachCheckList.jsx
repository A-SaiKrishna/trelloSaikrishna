import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import CheckItems from "./CheckItems";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { APITOKEN, APIKEY } from "./ApiInfo";

let EachCheckList = ({ obj, deleteCheckList, cardId }) => {
  //   const [percentage, setPercentage] = useState(0);
  let inputedValue = useRef("");
  let [addItem, setAddItem] = useState(true);
  let [itemData, setItemData] = useState(obj.checkItems);
  function postItem() {
    if (inputedValue.length != 0)
      fetch(
        `https://api.trello.com/1/checklists/${obj.id}/checkItems?name=${inputedValue.current}&key=${APIKEY}&token=${APITOKEN}`,
        {
          method: "POST",
        }
      )
        .then((response) => {
          console.log(`Response: ${response.status} ${response.statusText}`);
          return response.text();
        })
        .then((text) => {
          setItemData([...itemData, JSON.parse(text)]);
        })
        .catch((err) => console.error(err));
  }
  function deleteItem(id) {
    fetch(
      `https://api.trello.com/1/checklists/${obj.id}/checkItems/${id}?key=${APIKEY}&token=${APITOKEN}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => {
        console.log(text);
        setItemData(itemData.filter((obj) => obj.id != id));
      })
      .catch((err) => console.error(err));
  }
  function updateItem(id, state) {
    let stateOfItem = "complete";
    if (state === false) {
      stateOfItem = "incomplete";
    }

    fetch(
      `https://api.trello.com/1/cards/${cardId}/checkItem/${id}?key=${APIKEY}&state=${stateOfItem}&token=${APITOKEN}`,
      {
        method: "PUT",
      }
    )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => {
        console.log(text);
        console.log("hi");
        setItemData(
          itemData.map((obj) => {
            if (obj.id === id) {
              return { ...obj, state: stateOfItem };
            }
            return obj;
          })
        );
      })
      .catch((err) => console.error(err));
  }
  let percentage = 0;
  let lengthItem = itemData.length;
  if (lengthItem != 0) {
    let completeItems = itemData.reduce((red, pass) => {
      if (pass.state === "complete") {
        red += 1;
      }
      return red;
    }, 0);
    percentage = Math.floor((completeItems / lengthItem) * 100);
  }

  return (
    <div className="d-flex justify-content-center">
      <Paper elevation={3} sx={{ width: "90%" }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          sx={{ margin: "10px auto" }}
        >
          <Typography variant="h6">{obj.name}</Typography>
          <Button
            onClick={() => {
              deleteCheckList(obj.id);
            }}
          >
            delete
          </Button>
        </Box>
        <div className="d-flex justify-content-around my-2">
          <Typography variant="body1" sx={{ marginTop: "-10px" }}>
            {percentage}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{ width: "80%", borderRadius: 5 }}
          />
        </div>
        <Box display={"flex"} flexDirection={"column"}>
          {itemData
            ? itemData.map((subObj) => (
                <CheckItems
                  name={subObj.name}
                  deleteItem={deleteItem}
                  id={subObj.id}
                  updateItem={updateItem}
                  stateItem={subObj.state}
                />
              ))
            : ""}
        </Box>
        {addItem ? (
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "darkgray",
              margin: "10px",
              "&:hover": {
                backgroundColor: "gray",
              },
            }}
            onClick={() => {
              setAddItem(false);
            }}
          >
            Add an Item
          </Button>
        ) : (
          <Card sx={{ width: 300, marginRight: "1.5rem" }}>
            <CardContent>
              <TextField
                size="small"
                label="Enter item title"
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
                  setAddItem(!addItem);
                  //   postList();
                  postItem();
                }}
              >
                Add Item
              </Button>
              <Button
                onClick={() => {
                  setAddItem(!addItem);
                }}
              >
                <CloseIcon />
              </Button>
            </CardActions>
          </Card>
        )}
      </Paper>
    </div>
  );
};
export default EachCheckList;
