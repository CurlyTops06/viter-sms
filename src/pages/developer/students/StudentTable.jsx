// src/components/students/StudentsTable.jsx
// import ResponsiveTable from "../ui/ResponsiveTable";
import { FaEdit, FaTrash, FaUser } from "react-icons/fa";
import ResponsiveTable from "../ResponsiveTable";
import useQueryData from "../../../functions/custom-hooks/useQueryData";
import { apiVersion } from "../../../functions/functions-general";

const handleUpdate = (setIsOpen, setItemEdit, item) => {
  setIsOpen(true);
  setItemEdit(item);
};

const studentColumns = [
  {
    key: "name",
    header: "Name",
    render: (student) => (
      <div className=" items-center gap-3 text-black flex">
        <div className="hidden xl:block">{student.id}.</div>
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
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              handleUpdate(student.setIsOpen, student.setItemEdit, student)
            }
            className="cursor-pointer text-blue-600 hover:text-blue-800"
          >
            <FaEdit />
          </button>
          <button className="cursor-pointer text-red-600 hover:text-red-800">
            <FaTrash />
          </button>
        </div>
      );
    },
    mobilePosition: "bottomRight",
  },
];

const StudentsTable = ({ students, setIsOpen, itemEdit, setItemEdit }) => {
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
        setIsOpen,
        setItemEdit,
      };
    }) ?? [];

  return (
    <ResponsiveTable
      isLoading={isLoadingStudents}
      isFetching={isFetchingStudents}
      error={errorStudents}
      // data={students}
      data={studentArray}
      columns={studentColumns}
    />
  );
};

export default StudentsTable;
