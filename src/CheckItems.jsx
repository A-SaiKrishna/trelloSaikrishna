import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/system/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useState } from "react";
import { deleteDataItem, putItems } from "./API";
import { ITEM_ACTIONS } from "./EachCheckList";
let CheckItems = ({ name, listId, id, itemDispatch, stateItem, cardId }) => {
  const [isChecked, setIsChecked] = useState(
    stateItem === "complete" ? true : false
  );
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    // console.log(event.target.checked);
    let stateOfItem = "incomplete";
    if (event.target.checked === true) {
      stateOfItem = "complete";
    }
    putItems(cardId, id, stateOfItem).then((data) => {
      if (data instanceof Error) {
        console.error("error in updating the items ", data.message);
      } else {
        // updateItemsOnUpdate(id, stateOfItem);
        itemDispatch({
          type: ITEM_ACTIONS.UPDATE_ITEMS,
          payload: { id: id, stateOfItem: stateOfItem },
        });
      }
    });
  };
  //   console.log(obj);
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      sx={{ margin: "0 20px" }}
    >
      <FormControlLabel
        control={
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        }
        label={name}
      />
      <Button
        onClick={() => {
          // deleteItem(id);
          deleteDataItem("checklists", "checkItems", listId, id).then(
            (data) => {
              if (data instanceof Error) {
                console.error("error in deleting the item ", data.message);
              } else {
                // updateItemsOnDelete(id);
                itemDispatch({
                  type: ITEM_ACTIONS.DELETE_ITEMS,
                  payload: { id: id },
                });
              }
            }
          );
        }}
      >
        <DeleteIcon />
      </Button>
    </Box>
  );
};
export default CheckItems;
