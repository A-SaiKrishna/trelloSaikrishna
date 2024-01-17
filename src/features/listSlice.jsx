import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  lists: [],
};
const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    createLists: (state, action) => {
      state.lists = action.payload;
    },
    addLists: (state, action) => {
      state.lists.push(action.payload);
    },
  },
});

const { actions, reducer } = listSlice;
export const { createLists, addLists, archieveLists } = actions;
export default reducer;
