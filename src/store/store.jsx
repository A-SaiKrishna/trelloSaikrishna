import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/boardsSlice";
import listReducer from "../features/listSlice";
import cardReducer from "../features/cardSlice";
import checkListReducer from "../features/checkListSlice";
import checkItemReducer from "../features/checkItemsSlice";

export const trelloStore = configureStore({
  reducer: {
    Board: boardReducer,
    List: listReducer,
    Card: cardReducer,
    CheckList: checkListReducer,
    CheckItem: checkItemReducer,
  },
});
