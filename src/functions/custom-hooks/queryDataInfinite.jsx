import { queryData } from "./queryData";

export const queryDataInfinite = (
  url,
  isSearch = false,
  searchData = isSearch ? searchData : {},
  method = "get",
) => {
  return queryData(url, method, searchData);
};
    