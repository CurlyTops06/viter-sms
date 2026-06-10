import useQueryData from "@/functions/custom-hooks/useQueryData";
import { apiVersion, formatDate } from "@/functions/functions-general";
import NoData from "@/partials/NoData";
import ServerError from "@/partials/ServerError";
import FetchingSpinner from "@/partials/spinners/FetchingSpinner";
import TableLoading from "@/partials/TableLoading";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import SchoolYearCard from "./SchoolYearCard";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loadmore from "@/partials/Loadmore";
import { queryDataInfinite } from "@/functions/custom-hooks/queryDataInfinite";
import SearchBar from "@/partials/SearchBar";

const SchoolYearList = ({
  itemEdit,
  setItemEdit,
  queryKey = "",
  pathUrl = "",
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [filterStatus, setFilterStatus] = React.useState("");
  const [filterSchoolYear, setFilterSchoolYear] = React.useState("");
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();
  const [page, setPage] = React.useState(1);
  const deletePathUrl = pathUrl.split("/");
  const deleteLastIndex = deletePathUrl[deletePathUrl.length - 1];
  // const {
  //   isLoading,
  //   isFetching,
  //   error,
  //   data: dataSchoolYear,
  // } = useQueryData(
  //   `${apiVersion}/controllers/developer/school-year/school-year.php`,
  //   "get",
  //   "school-year",
  // );

  const {
    data: result,
    isLoading: isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [
      "school-year",
      search?.current.value,
      store.isSearch,
      filterStatus,
      filterSchoolYear,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${apiVersion}/controllers/developer/school-year/page.php?start=${pageParam}`,
        store.isSearch,
        {
          filterStatus,
          searchValue: search?.current.value,
          filterSchoolYear,
        },
        "post",
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return; //null || undefined
    },
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const allSchoolYear = result?.pages.flatMap((page) => page.data) ?? [];
  const schoolYearArray =
    allSchoolYear.map((item) => {
      return {
        ...item,
        id: item?.school_year_aid,
        school_year_is_active: item?.school_year_is_active,
        school_year_start: `${item?.school_year_start}`,
        school_year_end: `${item?.school_year_end}`,
        setIsAdd: (val) => dispatch(setIsAdd(val)),
        setIsArchive: (val) => dispatch(setIsArchive(val)),
        setIsRestore: (val) => dispatch(setIsRestore(val)),
        setIsDelete: (val) => dispatch(setIsDelete(val)),
        setItemEdit,
      };
    }) ?? [];

  const {
    isLoading: isLoadingSchoolYear,
    isFetching: isFetchingSchoolYear,
    error: errorSchoolYear,
    data: dataSchoolYear,
  } = useQueryData(
    `${apiVersion}/controllers/developer/school-year/school-year.php`,
    "get",
    "school-year",
  );
  const filterActiveSchoolYear = dataSchoolYear?.data.filter(
    (data) => data.school_year_is_active == 1,
  );

  return (
    <>
      {/* filter */}
      <div className="block lg:flex w-full justify-between px-8 pt-6">
        <div className="block lg:flex w-full lg:w-fit items-center gap-2 text-dark">
          <div className="relative">
            <label htmlFor="">School Year</label>
            <select
              className="filter-data w-full lg:w-auto text-center lg:text-left mb-2"
              onChange={(e) => {
                setFilterSchoolYear(e.target.value);
              }}
            >
              <option value="">All</option>
              {filterActiveSchoolYear?.map((item, key) => {
                return (
                  <option key={key} value={item.school_year_aid}>
                    {formatDate(item.school_year_start)} - {""}
                    {formatDate(item.school_year_end)}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex gap-3 w-full lg:w-auto mb-2 items-center justify-center border border-gray-300 rounded-lg px-4 py-[4.5px] relative">
            <label htmlFor="">Status</label>
            <button
              className="statusBadge font-medium rounded-lg "
              onClick={(e) => {
                setFilterStatus(e.target.value);
                console.log(e.target.value);
              }}
              value=""
            >
              All
            </button>
            <button
              className="statusBadge font-medium rounded-lg statusActive"
              onClick={(e) => {
                setFilterStatus(e.target.value);
                console.log(e.target.value);
              }}
              value="1"
            >
              Active
            </button>
            <button
              className="statusBadge font-medium rounded-lg statusInactive"
              onClick={(e) => {
                setFilterStatus(e.target.value);
                console.log(e.target.value);
              }}
              value="0"
            >
              Inactive
            </button>
          </div>
        </div>

        <div className="w-full lg:w-auto">
          <SearchBar
            search={search}
            result={[]}
            isFetching={isFetching}
            placeholder="Format: YYYY-MM-DD"
          />
        </div>
      </div>

      {/* cards wrapper */}
      {!isLoading && isFetching && <FetchingSpinner />}

      <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 p-5">
            <TableLoading cols={5} count={6} />
          </div>
        ) : error ? (
          <div className="col-span-3 flex justify-center items-center p-5">
            <ServerError />
          </div>
        ) : schoolYearArray.length === 0 ? (
          <div className="col-span-3 flex justify-center items-center p-5">
            <NoData />
          </div>
        ) : (
          schoolYearArray.map((c, key) => (
            <SchoolYearCard
              key={c.id}
              item={c}
              isLoading={status == "pending"}
              isFetching={isFetching}
              error={errorSchoolYear}
              data={schoolYearArray}
              deleteLastIndex={deleteLastIndex}
              pathUrl={pathUrl}
              dataItem={itemEdit}
              queryKey={queryKey}
            />
          ))
        )}
      </div>
      <div>
        <Loadmore
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          result={result}
          setPage={setPage}
          page={page}
          refView={ref}
          isSearch={store.isSearch}
        />
      </div>
    </>
  );
};

export default SchoolYearList;
