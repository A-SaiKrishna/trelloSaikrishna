import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
let EachCard = ({ obj, deleteCard }) => {
  //   console.log(obj.id);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Paper
      elevation={4}
      sx={{
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        margin: "10px 0",
      }}
    >
      <>
        {obj.name}
        <div style={{ float: "right" }}>
          <Button sx={{ color: "black" }} onClick={handleClick}>
            <EditIcon sx={{ marginTop: "-10px" }} />
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
      </>
    </Paper>
  );
};
export default EachCard;
