import { apiVersion } from "@/functions/functions-general";
import ModalArchive from "@/partials/modal/ModalArchive";
import ModalDelete from "@/partials/modal/ModalDelete";
import ModalRestore from "@/partials/modal/ModalRestore";
import { StoreContext } from "@/store/StoreContext";
import React from "react";
import {
  FaArchive,
  FaEdit,
  FaSchool,
  FaTrash,
  FaTrashRestore,
  FaUser,
  FaUserTie,
} from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { handleAction } from "./Classes";

const ClassesCardView = ({
  classes,
  deleteLastIndex,
  pathUrl,
  dataItem,
  queryKey = "",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { store, dispatch } = React.useContext(StoreContext);
  // console.log(classes);
  return (
    <>
      <div
        className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-2xl"
        key={classes.id}
      >
        {/* <!-- grade and section --> */}
        <div className="flex justify-between border-b border-black px-5 py-4 relative">
          <div className="flex items-center">
            <p className="text-black/80 font-bold">{classes.gradeSection}</p>
            <span
              className={`statusBadge ${classes.classes_is_active ? "statusActive" : "statusInactive"}`}
            >
              {classes.classes_is_active ? "Active" : "Inactive"}
            </span>
          </div>
          <button onClick={() => setIsOpen(!isOpen)}>
            <FiMoreVertical className="text-dark" />
          </button>
          {isOpen && (
            <div className="absolute right-0 top-8 z-50 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              {classes.classes_is_active ? (
                <>
                  <button
                    onClick={() => {
                      handleAction(
                        classes.setIsAdd,
                        classes.setItemEdit,
                        classes,
                      );
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    <FaEdit className="size-4" /> Edit
                  </button>
                  <div className="border-t border-gray-100" />
                  <button
                    onClick={() => {
                      handleAction(
                        classes.setIsArchive,
                        classes.setItemEdit,
                        classes,
                      );
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors cursor-pointer"
                  >
                    <FaArchive className="size-4" /> Archive
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleAction(
                        classes.setIsRestore,
                        classes.setItemEdit,
                        classes,
                      );
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors cursor-pointer"
                  >
                    <FaTrashRestore className="size-4" /> Restore
                  </button>
                  <div className="border-t border-gray-100" />
                  <button
                    onClick={() => {
                      handleAction(
                        classes.setIsDelete,
                        classes.setItemEdit,
                        classes,
                      );
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <FaTrash className="size-4" /> Delete
                  </button>
                </>
              )}
            </div>
          )}
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
              <li className="font-medium">
                {classes.teachers_last_name}, {classes.teachers_first_name}
              </li>
            </ul>
            {/* <!-- student --> */}
            <ul className="flex justify-between mb-3">
              <li className="flex items-center text-gray-600">
                <span className="mr-2">
                  <FaUser />
                </span>
                Number Of Students:
              </li>
              <li className="font-medium">{classes.noOfStudents}</li>
            </ul>
            {/* <!-- No. Students --> */}
            <ul className="flex justify-between mb-3">
              <li className="flex items-center text-gray-600">
                <span className="mr-2">
                  <FaSchool />
                </span>
                School Year:
              </li>
              <li className="font-medium">{classes.noOfStudents}</li>
            </ul>
            {/* <!-- buttons --> */}
            <div className="flex gap-3">
              <button
                className="flex-1 border border-blue-500 text-black/80 py-2 rounded-xl text-sm cursor-pointer"
                onClick={() => {
                  handleAction(classes.setIsAdd, classes.setItemEdit, classes);
                  setIsOpen(false);
                }}
              >
                View Class
              </button>

              <button
                className="flex-1 border border-gray-500 text-black/80 py-2 rounded-xl text-sm cursor-pointer"
                onClick={() => {
                  handleAction(classes.setIsAdd, classes.setItemEdit, classes);
                  setIsOpen(false);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Action Event */}
      {/* Archive */}
      {store.isArchive && (
        <ModalArchive
          endpoint={`${apiVersion}/${pathUrl}/active.php?id=${dataItem?.id ?? "0"}`}
          msg={`Are you sure you want to archive this record`}
          successMsg={`Successfully archived.`}
          item={dataItem}
          queryKey={queryKey}
        />
      )}
      {/* Restore */}
      {store.isRestore && (
        <ModalRestore
          endpoint={`${apiVersion}/${pathUrl}/active.php?id=${dataItem?.id ?? "0"}`}
          msg={`Are you sure you want to restore this record`}
          successMsg={`Successfully restored.`}
          item={dataItem}
          queryKey={queryKey}
        />
      )}
      {/* Delete */}
      {store.isDelete && (
        <ModalDelete
          endpoint={`${apiVersion}/${pathUrl}/${deleteLastIndex}.php?id=${dataItem?.id ?? "0"}`}
          msg={`Are you sure you want to delete this record`}
          successMsg={`Successfully deleted.`}
          item={dataItem}
          queryKey={queryKey}
        />
      )}
    </>
  );
};

export default ClassesCardView;
