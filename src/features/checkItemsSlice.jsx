import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  checkItems: {},
};
const checkItemsSlice = createSlice({
  name: "checkitem",
  initialState,
  reducers: {
    createItem: (state, action) => {
      state.checkItems[action.payload.checkListId] = action.payload.data;
    },
    addItems: (state, action) => {
      state.checkItems[action.payload.checkListId].push(action.payload.data);
    },
    deleteItem: (state, action) => {
      state.checkItems[action.payload.checkListId] = state.checkItems[
        action.payload.checkListId
      ].filter((eachItem) => {
        return eachItem.id != action.payload.id;
      });
    },
    updataItem: (state, action) => {
      state.checkItems[action.payload.checkListId] = state.checkItems[
        action.payload.checkListId
      ].map((eachItem) => {
        if (eachItem.id === action.payload.id) {
          return { ...eachItem, state: action.payload.stateOfItem };
        }
        return eachItem;
      });
    },
  },
});
const { reducer, actions } = checkItemsSlice;
export const { createItem, addItems, deleteItem, updataItem } = actions;
export default reducer;
