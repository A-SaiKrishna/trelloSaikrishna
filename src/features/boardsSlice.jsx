import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
    createBoard: (state, action) => {
      state.boards = action.payload;
    },
  },
});

const { actions, reducer } = boardsSlice;

export const { addBoard, createBoard } = actions;

export default reducer;
