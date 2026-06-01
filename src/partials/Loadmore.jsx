import React from "react";
import ButtonSpinner from "./spinners/ButtonSpinner";

const Loadmore = ({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  result,
  setPage,
  page,
  refView,
  isSearch,
}) => {
  if (page == result?.total_pages) {
    return (
      <>
        {isFetchingNextPage ? (
          <button
            type="button"
            disabled={isFetchingNextPage}
            className="h-full relative my-8 text-primary p-1.5 rounded-full w-36 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ButtonSpinner />
          </button>
        ) : (
          <div className="my-8 p-1.5">End of list</div>
        )}
      </>
    );
  }

  if (!hasNextPage && result?.count > 0 && !isFilter) {
    <div className="my-6 p-1.5">End of list.</div>;
  }

  if (hasNextPage) {
    return (
      <>
        <button
          type="button"
          ref={refView}
          disabled={isFetchingNextPage}
          onClick={() => {
            setPage((prev) => prev + 1);
            fetchNextPage();
          }}
          className="h-full relative my-8 text-primary p-1.5 rounded-full w-36 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFetchingNextPage ? <ButtonSpinner /> : <span>Load More</span>}
        </button>
      </>
    );
  }
};

export default Loadmore;
