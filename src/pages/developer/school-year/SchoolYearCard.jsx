import React from "react";
import {
  FaArchive,
  FaEdit,
  FaTrash,
  FaTrashRestore,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { handleAction } from "./SchoolYear";
import { apiVersion, formatDate } from "@/functions/functions-general";
import ModalArchive from "@/partials/modal/ModalArchive";
import ModalRestore from "@/partials/modal/ModalRestore";
import ModalDelete from "@/partials/modal/ModalDelete";
import { StoreContext } from "@/store/StoreContext";

const SchoolYearCard = ({
  item,
  itemEdit,
  deleteLastIndex,
  pathUrl,
  dataItem,
  queryKey = "",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm overflow-visible border border-gray-200">
        {/* Header */}
        <div className="border-b px-5 py-4 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-black/80 font-bold">
                {formatDate(item.school_year_start)} -{" "}
                {formatDate(item.school_year_end)}
              </p>

              <span
                className={`statusBadge ${item.school_year_is_active ? "statusActive" : "statusInactive"}`}
              >
                {item.school_year_is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mt-3 p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <FiMoreVertical className="size-4" />
            </button>

            {isOpen && (
              <div className="absolute right-0 top-8 z-50 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                {item.school_year_is_active ? (
                  <>
                    <button
                      onClick={() => {
                        handleAction(item.setIsAdd, item.setItemEdit, item);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      <FaEdit className="size-4" /> Edit
                    </button>
                    <div className="border-t border-gray-100" />
                    <button
                      onClick={() => {
                        handleAction(item.setIsArchive, item.setItemEdit, item);
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
                        handleAction(item.setIsRestore, item.setItemEdit, item);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors cursor-pointer"
                    >
                      <FaTrashRestore className="size-4" /> Restore
                    </button>
                    <div className="border-t border-gray-100" />
                    <button
                      onClick={() => {
                        handleAction(item.setIsDelete, item.setItemEdit, item);
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

export default SchoolYearCard;
