export const setIsError = (val) => {
  return {
    type: "IS_ERROR", //TO used as key to store reducer file
    payload: val, //set the new value
  };
};
export const setIsAdd = (val) => {
  return {
    type: "IS_ADD", //TO used as key to store reducer file
    payload: val, //set the new value
  };
};

export const setIsSuccess = (val) => {
  return {
    type: "IS_SUCCESS", //TO used as key to store reducer file
    payload: val, //set the new value
  };
};
export const setIsArchive = (val) => {
  return {
    type: "IS_ARCHIVE", //TO used as key to store reducer file
    payload: val, //set the new value
  };
};
export const setIsRestore = (val) => {
  return {
    type: "IS_RESTORE", //TO used as key to store reducer file
    payload: val, //set the new value
  };
};
export const setIsDelete = (val) => {
  return {
    type: "IS_DELETE", //TO used as key to store reducer file
    payload: val, //set the new value
  };
};
export const setMessage = (val) => {
  return {
    type: "MESSAGE", //TO used as key to store reducer file
    payload: val, //set the new value
  };
};
