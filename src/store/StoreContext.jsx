import React from "react";
import { StoreReducer } from "./StoreReducer";

const initVal = {
  isAdd: false, // store boolean to show modal add
  isError: false, // store boolean to show modal message
  isSuccess: false, // store boolean value to show success msg
  isArchive: false, // store boolean value to show archive modal
  isRestore: false, // store boolean value to show Restore modal
  isDelete: false, // store boolean value to show Delete modal
  isSearch: false, // store boolean value to show Search modal
  message: "", // store string value to show error message
};

const StoreContext = React.createContext();

const StoreProvider = (props) => {
  const [store, dispatch] = React.useReducer(StoreReducer, initVal);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
