import Paper from "@mui/material/Paper";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRef, useEffect, useState } from "react";
import EachCheckList from "./EachCheckList";
import { fetchData, postDataWithId } from "./API";
let CheckListPage = ({ obj }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  let [checkListData, setCheckListData] = useState([]);
  let inputedValue = useRef("");
  function updateCheckList(id) {
    setCheckListData([...checkListData].filter((obj) => obj.id != id));
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    fetchData("cards", "checklists", obj.id).then((data) => {
      if (data instanceof Error) {
        console.error("error while fetching checklists ", data.message);
      } else {
        setCheckListData(data);
      }
    });
  }, []);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box display="flex" justifyContent="center">
      <Paper elevation={3} sx={{ width: "60vh", height: "60vh" }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={8}>
            <Typography
              variant="body1"
              sx={{ margin: "10px 20px", fontWeight: "bold" }}
            >
              {obj.name}
            </Typography>
            {checkListData.map((obj1) => (
              <EachCheckList
                obj={obj1}
                updateCheckList={updateCheckList}
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
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        if (inputedValue.current)
                          postDataWithId("checklists", {
                            idCard: obj.id,
                            name: inputedValue.current,
                          }).then((data) => {
                            if (data instanceof Error) {
                              console.error(
                                "Error while inserting a checklist",
                                data.message
                              );
                            } else {
                              setCheckListData([...checkListData, data]);
                            }
                          });
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
