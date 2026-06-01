import React from "react";
import { teachers } from "./teachersData";
import {
  FaArchive,
  FaEdit,
  FaTrash,
  FaTrashRestore,
  FaUser,
} from "react-icons/fa";
import ResponsiveTable from "../ResponsiveTable";
import { StoreContext } from "@/store/StoreContext";
import useQueryData from "@/functions/custom-hooks/useQueryData";
import { apiVersion } from "@/functions/functions-general";
import { handleAction } from "./Teachers";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "@/store/StoreAction";

const TeacherColumns = [
  {
    key: "name",
    header: "Name",
    render: (teacher, key) => (
      <div className=" items-center gap-3 text-black flex">
        <div className="hidden xl:block">{key + 1}.</div>
        <div className="size-8 bg-blue-100 rounded-full flex items-center justify-center">
          <FaUser className="text-blue-600 text-sm" />
        </div>
        <div>
          <p className="font-medium">{teacher.name}</p>
          <p className="text-xs text-gray-500 xl:hidden">{teacher.subject}</p>
        </div>
      </div>
    ),
    mobileLabel: null,
  },
  {
    key: "subject",
    header: "Subject",
    render: (teacher) => <p>{teacher.subject}</p>,
    mobileLabel: null,
  },
  {
    key: "email",
    header: "Email",
    render: (teacher) => <p>{teacher.email}</p>,
    mobileLabel: "Email",
  },
  {
    key: "status",
    header: "Status",
    render: (teacher) => (
      <p className={`statusBadge status${teacher.status}`}>{teacher.status}</p>
    ),
    mobilePosition: "topRight",
  },
  {
    key: "actions",
    header: "Actions",
    render: (teacher) => {
      return (
        <div className="flex gap-2 mr-2">
          {teacher.teachers_is_active ? (
            <>
              <button
                type="button"
                onClick={() =>
                  handleAction(teacher.setIsAdd, teacher.setItemEdit, teacher)
                }
                className="cursor-pointer text-blue-600 hover:text-blue-800 tooltip-action"
                data-tooltip="Edit"
              >
                <FaEdit />
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    teacher.setIsArchive,
                    teacher.setItemEdit,
                    teacher,
                  )
                }
                className="cursor-pointer text-orange-400 hover:text-orange-500 tooltip-action"
                data-tooltip="Archive"
              >
                <FaArchive />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() =>
                  handleAction(
                    teacher.setIsRestore,
                    teacher.setItemEdit,
                    teacher,
                  )
                }
                className="cursor-pointer text-orange-400 hover:text-orange-500 tooltip-action"
                data-tooltip="Restore"
              >
                <FaTrashRestore />
              </button>
              <button
                onClick={() =>
                  handleAction(
                    teacher.setIsDelete,
                    teacher.setItemEdit,
                    teacher,
                  )
                }
                className="cursor-pointer text-red-600 hover:text-red-800 tooltip-action"
                data-tooltip="Delete"
              >
                <FaTrash />
              </button>
            </>
          )}
        </div>
      );
    },
    mobilePosition: "bottomRight",
  },
];

const TeacherTable = ({ itemEdit, setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const {
    isLoading: isLoadingTeachers,
    isFetching: isFetchingTeachers,
    error: errorTeachers,
    data: dataTeachers,
  } = useQueryData(
    `${apiVersion}/controllers/developer/teachers/teachers.php`,
    "get",
    "teachers",
  );
  const teacherArray =
    dataTeachers?.data.map((item) => {
      return {
        ...item,
        id: item.teachers_aid,
        name: `${item.teachers_honorific} ${item.teachers_first_name} ${item.teachers_last_name}`,
        subject: `${item.teachers_subject}`,
        email: `${item.teachers_email}`,
        status: item.teachers_is_active ? "Active" : "Inactive",
        setIsAdd: (val) => dispatch(setIsAdd(val)),
        setIsArchive: (val) => dispatch(setIsArchive(val)),
        setIsRestore: (val) => dispatch(setIsRestore(val)),
        setIsDelete: (val) => dispatch(setIsDelete(val)),
        setItemEdit,
      };
    }) ?? [];

  return (
    <>
      
      {/* Table */}
      <ResponsiveTable
        isLoading={isLoadingTeachers}
        isFetching={isFetchingTeachers}
        error={errorTeachers}
        data={teacherArray}
        columns={TeacherColumns}
        dataItem={itemEdit}
        queryKey={["teachers", ""]}
        pathUrl={`/controllers/developer/teachers`}
      />
      {/* Total */}
      <div className="px-6 py-4 bg-gray-100 border-t border-black flex justify-between">
        <span className="text-sm text-gray-600">
          {teacherArray.length} teachers
        </span>
      </div>
    </>
  );
};

export default TeacherTable;
