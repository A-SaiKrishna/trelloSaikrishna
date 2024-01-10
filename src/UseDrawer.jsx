import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

let UseDrawer = () => {
  return (
    <Drawer
      sx={{
        width: "200px",
        flexShrink: 0,
        backgroundColor: "#cccccc",
        zIndex: "1",
        "& .MuiDrawer-paper": {
          width: "200px",
          boxSizing: "border-box",
          height: "100%",
          top: "unset",
          backgroundColor: "#cccccc",
          zIndex: "1",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />

      <List>
        <Link to="/">
          {["Boards"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ margin: "0 auto", color: "black", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary={text} sx={{ textDecoration: "none" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </Link>
      </List>
    </Drawer>
  );
};

export default UseDrawer;
