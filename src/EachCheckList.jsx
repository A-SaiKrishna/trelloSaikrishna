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
import { archieveData, deleteData } from "./API";

let EachCheckList = ({ obj, updateCheckList, cardId }) => {
  //   const [percentage, setPercentage] = useState(0);
  let inputedValue = useRef("");
  let [addItem, setAddItem] = useState(true);
  let [itemData, setItemData] = useState(obj.checkItems);

  function updateItemsOnDelete(id) {
    setItemData(itemData.filter((obj) => obj.id != id));
  }
  function updateItemsOnUpdate(id, stateOfItem) {
    setItemData(
      itemData.map((obj) => {
        if (obj.id === id) {
          return { ...obj, state: stateOfItem };
        }
        return obj;
      })
    );
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
              // deleteCheckList(obj.id);
              deleteData("checklists", obj.id).then((data) => {
                if (data instanceof Error) {
                  console.error("error in deleting the checkList");
                } else {
                  updateCheckList(obj.id);
                }
              });
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
                  updateItemsOnDelete={updateItemsOnDelete}
                  listId={obj.id}
                  id={subObj.id}
                  updateItemsOnUpdate={updateItemsOnUpdate}
                  stateItem={subObj.state}
                  cardId={cardId}
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
                  // postItem();
                  if (inputedValue.current && obj && obj.id) {
                    let subURL = `/checklists/${obj.id}/checkItems`;
                    archieveData("checklists", "checkItems", obj.id, {
                      name: inputedValue.current,
                    }).then((data) => {
                      if (data instanceof Error) {
                        console.error(
                          "error while posting a new item ",
                          data.message
                        );
                      } else {
                        setItemData([...itemData, data]);
                      }
                    });
                  }
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
