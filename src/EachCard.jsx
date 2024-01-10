import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import CheckListPage from "./CheckListPage";

let EachCard = ({ obj, deleteCard }) => {
  // console.log(obj.id);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorCheck, setAnchorCheck] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickCheck = (event) => {
    event.preventDefault();
    setAnchorCheck(event.currentTarget);
  };
  const handleCloseCheck = () => {
    setAnchorCheck(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "edit-popover" : undefined;
  const openCheck = Boolean(anchorCheck);
  const idCheck = openCheck ? "check-popover" : undefined;

  return (
    <>
      <Box display="flex">
        <div style={{ width: "80%" }}>
          <Paper
            elevation={4}
            sx={{
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingLeft: "10px",
              paddingRight: "10px",
              margin: "10px 0",
            }}
            onClick={handleClickCheck}
          >
            <>{obj.name}</>
          </Paper>
          <Popover
            id={idCheck}
            open={openCheck}
            anchorEl={anchorCheck}
            onClose={handleCloseCheck}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
          >
            <CheckListPage obj={obj} />
          </Popover>
        </div>
        <div>
          <Button sx={{ color: "black" }} onClick={handleClick}>
            <EditIcon sx={{ marginTop: "10px" }} />
          </Button>
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
            <Typography sx={{ p: 2 }}>
              <Button
                sx={{ color: "black" }}
                onClick={() => {
                  deleteCard(obj.id);
                }}
              >
                Delete
              </Button>
            </Typography>
          </Popover>
        </div>
      </Box>
    </>
  );
};
export default EachCard;
