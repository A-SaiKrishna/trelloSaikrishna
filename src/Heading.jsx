import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
import CreatingBoard from "./CreatingBoard";

const Heading = ({ adding }) => {
  const logoUrl = "https://trello.com/assets/87e1af770a49ce8e84e3.gif";
  //   async function fetch
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#cccccc" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src={logoUrl}
            alt="Logo"
            style={{ width: "100px", height: "auto" }}
          />
          <CreatingBoard adding={adding} />
          <Avatar alt="SK" src="/static/images/avatar/1.jpg" />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Heading;
