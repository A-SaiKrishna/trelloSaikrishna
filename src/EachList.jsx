import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import UserCard from "./UserCard";
import { APITOKEN, APIKEY } from "./ApiInfo";

let EachList = ({ object, archieveList }) => {
  //   console.log(object);
  let [cardData, setCardData] = useState([]);
  let [showText, setShowText] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  let cardInput = useRef("");

  async function fetchingCards() {
    let response = await fetch(
      `https://api.trello.com/1/lists/${object.id}/cards?key=${APIKEY}&token=${APITOKEN}`
    );
    let data = response.json();
    return data;
  }
  useEffect(() => {
    fetchingCards().then((data) => {
      setCardData(data);
    });
  }, []);

  function deletingCards(id) {
    fetch(
      `https://api.trello.com/1/cards/${id}?key=${APIKEY}&token=${APITOKEN}`,
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
        setCardData(cardData.filter((obj) => obj.id != id));
      })
      .catch((err) => console.error(err));
  }
  function postCard() {
    const data = {
      idList: object.id,
      name: cardInput.current,
      key: APIKEY,
      token: APITOKEN,
    };
    if (cardInput.current.length != 0)
      fetch("https://api.trello.com/1/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.text())
        .then((text) => {
          //   console.log(text);
          setCardData([...cardData, JSON.parse(text)]);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Card
        sx={{
          width: 300,
          marginRight: "1.5rem",
          height: "auto",
        }}
      >
        <CardContent sx={{ height: "auto" }}>
          <Box display="flex" justifyContent="space-between">
            <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
              {object.name}
            </Typography>
            <div>
              <Button sx={{ color: "black" }} onClick={handleClick}>
                <MoreHorizIcon />
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
                      archieveList(object.id);
                      setCardData([]);
                    }}
                  >
                    Archive/Delete
                  </Button>
                </Typography>
              </Popover>
            </div>
          </Box>
          <UserCard cardData={cardData} deleteCard={deletingCards} />
          {showText && (
            <>
              <TextField
                size="small"
                label="Enter a title for this card"
                onChange={(e) => {
                  cardInput.current = e.target.value;
                }}
                // sx={{ height: "50px" }}
              />
              <Button
                size="small"
                onClick={() => {
                  setShowText(false);
                  postCard();
                }}
              >
                create
              </Button>
            </>
          )}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={() => {
              setShowText(true);
            }}
          >
            Add a card
          </Button>
          {showText && (
            <Button
              onClick={() => {
                setShowText(false);
              }}
            >
              <CloseIcon />
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default EachList;
