import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  checkList: {},
};
const checkListSlice = createSlice({
  name: "checkList",
  initialState,
  reducers: {
    createCheckList: (state, action) => {
      state.checkList[action.payload.cardId] = action.payload.data;
    },
    addCheckList: (state, action) => {
      state.checkList[action.payload.cardId].push(action.payload.data);
    },
    deleteCheckList: (state, action) => {
      //   console.log(state.checkList[action.payload.cardId]);
      state.checkList[action.payload.cardId] = state.checkList[
        action.payload.cardId
      ].filter((eachCheckList) => {
        return eachCheckList.id !== action.payload.id;
      });
    },
  },
});
const { actions, reducer } = checkListSlice;
export const { createCheckList, addCheckList, deleteCheckList } = actions;
export default reducer;
