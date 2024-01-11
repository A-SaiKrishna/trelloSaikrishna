import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/system/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useState } from "react";
import { deleteDataItem, putItems } from "./API";
let CheckItems = ({
  name,
  updateItemsOnDelete,
  listId,
  id,
  updateItemsOnUpdate,
  stateItem,
  cardId,
}) => {
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
        updateItemsOnUpdate(id, stateOfItem);
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
                updateItemsOnDelete(id);
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
