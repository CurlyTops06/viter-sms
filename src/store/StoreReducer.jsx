export const StoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_ADD":
      return {
        ...state, //Store all INITVAL
        isAdd: action.payload, //overwrite the value
      };
    case "IS_ERROR":
      return {
        ...state, //Store all INITVAL
        isError: action.payload, //overwrite the value
      };
    case "IS_SUCCESS":
      return {
        ...state, //Store all INITVAL
        isSuccess: action.payload, //overwrite the value
      };
    case "IS_ARCHIVE":
      return {
        ...state, //Store all INITVAL
        isArchive: action.payload, //overwrite the value
      };
    case "IS_RESTORE":
      return {
        ...state, //Store all INITVAL
        isRestore: action.payload, //overwrite the value
      };
    case "IS_DELETE":
      return {
        ...state, //Store all INITVAL
        isDelete: action.payload, //overwrite the value
      };
    case "IS_SEARCH":
      return {
        ...state, //Store all INITVAL
        isSearch: action.payload, //overwrite the value
      };
    case "MESSAGE":
      return {
        ...state, //Store all INITVAL
        message: action.payload, //overwrite the value
      };
    // IF Action type not exist return the init val
    default:
      return state;
  }
};
