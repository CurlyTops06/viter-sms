import React from "react";
import { FaUser, FaUserTie } from "react-icons/fa";
import { classes } from "./classesData";
import { StoreContext } from "@/store/StoreContext";
import useQueryData from "@/functions/custom-hooks/useQueryData";
import { apiVersion } from "@/functions/functions-general";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "@/store/StoreAction";
import FetchingSpinner from "@/partials/spinners/FetchingSpinner";
import TableLoading from "@/partials/TableLoading";
import ServerError from "@/partials/ServerError";
import NoData from "@/partials/NoData";
import { FiMoreVertical } from "react-icons/fi";

const ClassesCard = ({
  itemEdit,
  setItemEdit,
  data,
  pathUrl = "",
  isLoading = false,
  isFetching = false,
  error = false,
  dataItem = {},
  queryKey = "",
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const deletePathUrl = pathUrl.split("/");
  const deleteLastIndex = deletePathUrl[deletePathUrl.length - 1];

  return (
    <>
      {/* <!-- class sched --> */}

      <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative">
        {/* <!-- card --> */}
        {isLoading && isFetching && <FetchingSpinner />}
        {isLoading ? (
          <div className="p-5 w-full h-full">
            <TableLoading cols={2} count={20} />
          </div>
        ) : error ? (
          <div className="p-5 w-full h-full">
            <ServerError />
          </div>
        ) : data.length == 0 ? (
          <div className="p-5 w-full h-full">
            <NoData />
          </div>
        ) : (
          data.map((classes) => (
            <div
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-2xl"
              key={classes.id}
            >
              {/* <!-- grade and section --> */}
              <div className="flex justify-between border-b border-black px-5 py-4">
                <p className="text-black/80 font-bold">
                  {classes.gradeSection}
                </p>
                <FiMoreVertical className="text-dark" />
              </div>
              {/* <!-- details and action --> */}
              <div className="p-5">
                {/* <!-- details --> */}
                <div>
                  {/* <!-- adviser --> */}
                  <ul className="flex justify-between mb-3">
                    <li className="flex items-center text-gray-600">
                      <span className="mr-2">
                        <FaUserTie />
                      </span>
                      Adviser:
                    </li>
                    <li className="font-medium">{classes.adviser}</li>
                  </ul>
                  {/* <!-- student --> */}
                  <ul className="flex justify-between mb-3">
                    <li className="flex items-center text-gray-600">
                      <span className="mr-2">
                        <FaUser />
                      </span>
                      Students:
                    </li>
                    <li className="font-medium">{classes.noOfStudents}</li>
                  </ul>
                  {/* <!-- buttons --> */}
                  <div className="flex gap-3">
                    <button className="flex-1 border border-blue-500 text-black/80 py-2 rounded-xl text-sm cursor-pointer">
                      View Class
                    </button>

                    <button className="flex-1 border border-gray-500 text-black/80 py-2 rounded-xl text-sm cursor-pointer">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ClassesCard;
