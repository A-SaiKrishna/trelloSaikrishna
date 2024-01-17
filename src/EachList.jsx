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
import { archieveData, fetchData, postDataWithId } from "./API";
import { useDispatch, useSelector } from "react-redux";
import { addCards, createCards, deleteCards } from "./features/cardSlice";
import { archieveLists } from "./features/cardSlice";
import uuid4 from "uuid4";
let EachList = ({ object }) => {
  // let [cardData, setCardData] = useState([]);
  let cardSelector = useSelector((state) => state.Card.cards);
  // console.log(cardSelector);
  let cardData = cardSelector.filter(
    (listOfCard) => listOfCard.id === object.id
  );
  cardData = cardData[0] ? cardData[0].data : [];
  // console.log(cardData);
  let cardDispatch = useDispatch();
  let [showText, setShowText] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  let listsDispatch = useDispatch();
  let cardInput = useRef("");
  useEffect(() => {
    // Only fetch data if it hasn't been loaded yet
    fetchData("lists", "cards", object.id).then((data) => {
      if (data instanceof Error) {
        console.log("Error while fetching the cards in list ", data.message);
      } else {
        if (data != undefined) {
          cardDispatch(createCards({ id: object.id, data: data }));
          // console.log(data);
        }
      }
    });
    // Mark data as loaded after initiating the fetch
  }, []);
  function updatingCardData(id) {
    // setCardData(cardData.filter((obj) => obj.id != id));
    cardDispatch(deleteCards({ listId: object.id, id: id }));
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
          // height: "content",
          flexShrink: "0",
        }}
      >
        <CardContent>
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
                      archieveData("lists", "archiveAllCards", object.id);
                      // setCardData([]);
                      listsDispatch(archieveLists({ listId: object.id }));
                    }}
                  >
                    Archive/Delete
                  </Button>
                </Typography>
              </Popover>
            </div>
          </Box>
          <UserCard cardData={cardData} updatingCardData={updatingCardData} />
          {showText && (
            <>
              <TextField
                size="small"
                label="Enter a title for this card"
                onChange={(e) => {
                  cardInput.current = e.target.value;
                }}
              />
              <Button
                size="small"
                onClick={() => {
                  setShowText(false);
                  if (cardInput.current)
                    postDataWithId("cards", {
                      idList: object.id,
                      name: cardInput.current,
                    }).then((data) => {
                      if (data instanceof Error) {
                        console.error(
                          "error while creating a new card ",
                          data.message
                        );
                      } else {
                        // setCardData([...cardData, data]);
                        // console.log("hi");
                        cardDispatch(
                          addCards({ listId: object.id, data: data })
                        );
                      }
                    });
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
