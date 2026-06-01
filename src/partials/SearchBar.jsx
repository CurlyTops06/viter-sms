import { setIsSearch } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  search,
  result,
  isFetching = false,
  placeholder = "Search here...",
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleChange = (e) => {
    if (e.target.value == "") {
      dispatch(setIsSearch(false));
    } else {
      dispatch(setIsSearch(true));
    }
  };

  const handleSubmit = (e) => {
    // to prevent loading the page
    e.preventDefault();
    const val = search.current.value;
    if (val.trim() == "") {
      dispatch(setIsSearch(false));
    } else {
      dispatch(setIsSearch(true));
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <span className="absolute top-2 left-2" type="submit">
            <FaSearch />
          </span>
          <input
            type="search"
            placeholder={placeholder}
            className="pl-7"
            ref={search}
            onChange={handleChange}
          />
        </div>
      </form>
    </>
  );
};

export default SearchBar;
