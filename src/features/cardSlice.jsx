import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  cards: [],
};
let cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    createCards: (state, action) => {
      //   console.log(action.payload.id);
      if (action.payload.id) {
        state.cards = [
          ...state.cards,
          { id: action.payload.id, data: action.payload.data },
        ];
        // console.log(state.cards);
      }
    },
    addCards: (state, action) => {
      state.cards = state.cards.map((eachList) => {
        if (eachList.id === action.payload.listId) {
          return {
            ...eachList,
            data: [...eachList.data, action.payload.data],
          };
        }
        return eachList;
      });
    },
    deleteCards: (state, action) => {
      state.cards = state.cards.map((eachList) => {
        if (eachList.id === action.payload.listId) {
          return {
            ...eachList,
            data: eachList.data.filter(
              (eachCard) => eachCard.id !== action.payload.id
            ),
          };
        }
        return eachList;
      });
    },
    archieveLists: (state, action) => {
      state.cards = state.cards.map((eachList) => {
        if (eachList.id === action.payload.listId) {
          return { id: eachList.id, data: [] };
        }
        return eachList;
      });
    },
  },
});
const { actions, reducer } = cardSlice;
export const { createCards, addCards, deleteCards, archieveLists } = actions;
export default reducer;
