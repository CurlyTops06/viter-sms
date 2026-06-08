import NoData from "@/partials/NoData";
import ServerError from "@/partials/ServerError";
import FetchingSpinner from "@/partials/spinners/FetchingSpinner";
import TableLoading from "@/partials/TableLoading";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import ClassesCardView from "./ClassesCardView";

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
  const [isOpen, setIsOpen] = React.useState(false);
  const { store, dispatch } = React.useContext(StoreContext);
  const deletePathUrl = pathUrl.split("/");
  const deleteLastIndex = deletePathUrl[deletePathUrl.length - 1];
  // console.log(data);
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
          data.map((classes, key) => {
            // console.log(classes);
            return (
              <React.Fragment key={key}>
                <ClassesCardView
                  key={classes.id}
                  classes={classes}
                  dataItem={dataItem}
                  deleteLastIndex={deleteLastIndex}
                  pathUrl={`/controllers/developer/classes`}
                  queryKey={queryKey}
                />
              </React.Fragment>
            );
          })
        )}
      </div>
    </>
  );
};

export default ClassesCard;
