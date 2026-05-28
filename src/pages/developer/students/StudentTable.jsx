// src/components/students/StudentsTable.jsx
// import ResponsiveTable from "../ui/ResponsiveTable";
import {
  FaArchive,
  FaEdit,
  FaTrash,
  FaTrashRestore,
  FaUser,
} from "react-icons/fa";
import ResponsiveTable from "../ResponsiveTable";
import useQueryData from "../../../functions/custom-hooks/useQueryData";
import { apiVersion } from "../../../functions/functions-general";
import { handleAction } from "./Students";
import { StoreContext } from "../../../store/StoreContext";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../store/StoreAction";
import React from "react";

const studentColumns = [
  {
    key: "name",
    header: "Name",
    render: (student, key) => (
      <div className=" items-center gap-3 text-black flex">
        {console.log(key++)}
        <div className="hidden xl:block">{key++}.</div>
        <div className="size-8 bg-blue-100 rounded-full flex items-center justify-center">
          <FaUser className="text-blue-600 text-sm" />
        </div>
        <div>
          <p className="font-medium">{student.name}</p>
          <p className="text-xs text-gray-500 xl:hidden">{student.studentId}</p>
        </div>
      </div>
    ),
    mobileLabel: null,
  },
  {
    key: "studentId",
    header: "Student ID",
    render: (student) => <p>{student.studentId}</p>,
    mobileLabel: null,
  },
  {
    key: "studentGradeSection",
    header: "Grade & Section",
    render: (student) => (
      <p className="px-0 xl:px-2 py-1 text-sm xl:text-xs font-semibold rounded-lg xl:bg-blue-100 xl:text-blue-700 w-fit">
        {student.gradeSection}
      </p>
    ),
    mobileLabel: "Grade & Section",
  },
  {
    key: "status",
    header: "Status",
    render: (student) => (
      <p className={`statusBadge status${student.status}`}>{student.status}</p>
    ),
    mobilePosition: "topRight",
  },
  {
    key: "actions",
    header: "Actions",
    render: (student) => {
      return (
        <div className="flex gap-2 mr-2">
          {student.students_is_active ? (
            <>
              <button
                type="button"
                onClick={() =>
                  handleAction(student.setIsAdd, student.setItemEdit, student)
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
                    student.setIsArchive,
                    student.setItemEdit,
                    student,
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
                    student.setIsRestore,
                    student.setItemEdit,
                    student,
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
                    student.setIsDelete,
                    student.setItemEdit,
                    student,
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

const StudentsTable = ({ itemEdit, setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const {
    isLoading: isLoadingStudents,
    isFetching: isFetchingStudents,
    error: errorStudents,
    data: dataStudents,
  } = useQueryData(
    `${apiVersion}/controllers/developer/students/students.php`,
    "get", //method
    "students", //key
  );
  const studentArray =
    dataStudents?.data.map((item) => {
      return {
        ...item,
        id: item.students_aid,
        name: `${item.students_first_name} ${item.students_last_name}`,
        studentId: item.students_id,
        grade: `${item.students_grade} - ${item.students_section}`,
        gradeSection: `${item.students_grade} - ${item.students_section}`,
        status: item.students_is_active ? "Active" : "Inactive",
        setIsAdd: (val) => dispatch(setIsAdd(val)),
        setIsArchive: (val) => dispatch(setIsArchive(val)),
        setIsRestore: (val) => dispatch(setIsRestore(val)),
        setIsDelete: (val) => dispatch(setIsDelete(val)),
        setItemEdit,
      };
    }) ?? [];

  return (
    <>
      <ResponsiveTable
        isLoading={isLoadingStudents}
        isFetching={isFetchingStudents}
        error={errorStudents}
        data={studentArray}
        columns={studentColumns}
        dataItem={itemEdit}
        // queryKey="students" // for one records refetching
        queryKey={["students", ""]} // for multiple records refetching
        pathUrl={`/controllers/developer/students`} //this is for archive, restore, delete path api
      />
      {/* Total */}
      <div className="px-6 py-4 bg-gray-100 border-t border-black flex justify-between">
        <span className="text-sm text-gray-600">
          {studentArray.length} students
        </span>
      </div>
    </>
  );
};

export default StudentsTable;
