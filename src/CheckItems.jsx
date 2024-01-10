import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/system/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useState } from "react";
let CheckItems = ({ name, deleteItem, id, updateItem, stateItem }) => {
  const [isChecked, setIsChecked] = useState(
    stateItem === "complete" ? true : false
  );
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    // console.log(event.target.checked);
    updateItem(id, !isChecked);
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
          deleteItem(id);
        }}
      >
        <DeleteIcon />
      </Button>
    </Box>
  );
};
export default CheckItems;
