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

let UseDrawer = () => {
  return (
    <Drawer
      sx={{
        width: "200px",
        flexShrink: 0,
        backgroundColor: "#cccccc",
        "& .MuiDrawer-paper": {
          width: "200px",
          boxSizing: "border-box",
          height: "100%",
          top: "unset",
          backgroundColor: "#cccccc",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />

      <List>
        {["Boards"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ margin: "0 auto" }}>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default UseDrawer;
