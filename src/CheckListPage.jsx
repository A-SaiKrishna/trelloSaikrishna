import Paper from "@mui/material/Paper";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Button from "@mui/material/Button";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
// import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRef, useEffect, useState } from "react";
import { APITOKEN, APIKEY } from "./ApiInfo";
import EachCheckList from "./EachCheckList";
let CheckListPage = ({ obj }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  let [checkListData, setCheckListData] = useState([]);
  let inputedValue = useRef("");
  async function postCheckList() {
    // console.log(obj.id);
    if (inputedValue.current.length != 0)
      await fetch(
        `https://api.trello.com/1/checklists?idCard=${obj.id}&name=${inputedValue.current}&key=${APIKEY}&token=${APITOKEN}`,
        {
          method: "POST",
        }
      )
        .then((response) => {
          console.log(`Response: ${response.status} ${response.statusText}`);
          return response.text();
        })
        .then((text) => {
          setCheckListData([...checkListData, JSON.parse(text)]);
        })
        .catch((err) => console.error(err));
  }
  async function getCheckList() {
    // console.log()
    let response = await fetch(
      `https://api.trello.com/1/cards/${obj.id}/checklists?key=${APIKEY}&token=${APITOKEN}`
    );
    let data = await response.json();
    return data;
  }
  function deleteCheckList(id) {
    fetch(
      `https://api.trello.com/1/checklists/${id}?key=${APIKEY}&token=${APITOKEN}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => {
        setCheckListData([...checkListData].filter((obj) => obj.id != id));
      })
      .catch((err) => console.error(err));
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    getCheckList().then((data) => {
      setCheckListData(data);
    });
  }, []);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box display="flex" justifyContent="center">
      <Paper elevation={3} sx={{ width: "60vh", height: "60vh" }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={8}>
            {checkListData.map((obj1) => (
              <EachCheckList
                obj={obj1}
                deleteCheckList={deleteCheckList}
                cardId={obj.id}
              />
            ))}
          </Grid>
          <Grid item xs={4} sx={{ backgroundColor: "#cccccc" }}>
            <div>
              <Paper
                elevation={3}
                sx={{ padding: "10px 20px", margin: "100% 0" }}
                onClick={handleClick}
              >
                <Button startIcon={<CheckBoxIcon />}>checklist</Button>
              </Paper>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
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
                        postCheckList();
                      }}
                    >
                      Add list
                    </Button>
                  </CardActions>
                </Card>
              </Popover>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
export default CheckListPage;
