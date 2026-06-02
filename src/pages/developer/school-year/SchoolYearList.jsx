import useQueryData from "@/functions/custom-hooks/useQueryData";
import { apiVersion } from "@/functions/functions-general";
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

const SchoolYearList = ({ itemEdit, setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const {
    isLoading,
    isFetching,
    error,
    data: dataSchoolYear,
  } = useQueryData(
    `${apiVersion}/controllers/developer/school-year/school-year.php`,
    "get",
    "school-year",
  );

  const schoolYearArray =
    dataSchoolYear?.data.map((item) => {
      return {
        ...item,
        id: item.school_year_aid,

        setIsAdd: (val) => dispatch(setIsAdd(val)),
        setIsArchive: (val) => dispatch(setIsArchive(val)),
        setIsRestore: (val) => dispatch(setIsRestore(val)),
        setIsDelete: (val) => dispatch(setIsDelete(val)),
        setItemEdit,
      };
    }) ?? [];

  return (
    <>
      {/* filter */}
      <div className="flex  px-8 pt-6">
        <div className="flex items-center gap-2 text-dark">
          <select className="filter-data">
            <option>Grade 7</option>
            <option>Grade 8</option>
            <option>Grade 9</option>
            <option>Grade 10</option>
          </select>
          <select className="filter-data">
            <option>2025-2026</option>
            <option>2024-2025</option>
            <option>2023-2024</option>
          </select>
          <div className="flex gap-3 border border-gray-300 rounded-lg px-4 py-[4.5px] ">
            <button className="statusBadge font-medium rounded-lg statusActive">
              Active
            </button>
            <button className="statusBadge font-medium rounded-lg">
              Archived
            </button>
            <button className="statusBadge font-medium rounded-lg">
              Inactive
            </button>
          </div>
          <input type="text" placeholder="Search here..." />
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
          schoolYearArray.map((c) => (
            <SchoolYearCard key={c.id} item={c} data={schoolYearArray} />
          ))
        )}
      </div>
    </>
  );
};

export default SchoolYearList;
