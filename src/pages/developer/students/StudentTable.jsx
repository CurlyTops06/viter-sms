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
import SearchBar from "@/partials/SearchBar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "@/functions/custom-hooks/queryDataInfinite";
import { useInView } from "react-intersection-observer";
import Loadmore from "@/partials/Loadmore";

const studentColumns = [
  {
    key: "counter",
    header: "#",
    render: (student) => <p>{student.counter}.</p>,
    mobileLabel: null,
  },
  {
    key: "name",
    header: "Name",
    render: (student, key) => (
      <div className=" items-center gap-3 text-black flex">
        <div className="size-8 bg-blue-100 rounded-full flex items-center justify-center">
          <FaUser className="text-blue-600 text-sm" />
        </div>
        <div>
          <p className="font-medium">{student.name}</p>
          <p className="text-xs text-gray-500 xl:hidden">{student.studentId}</p>
        </div>
      </div>
    ),
    mobileLabel: "Student Name",
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
  const [filterStatus, setFilterStatus] = React.useState("");
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();
  const [page, setPage] = React.useState(1);

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["students", search?.current.value, store.isSearch, filterStatus],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${apiVersion}/controllers/developer/students/page.php?start=${pageParam}`, //api path
        store.isSearch, //is searching
        {
          filterStatus,
          searchValue: search?.current.value,
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

  // const {
  //   isLoading: isLoadingStudents,
  //   isFetching: isFetchingStudents,
  //   error: errorStudents,
  //   data: dataStudents,
  // } = useQueryData(
  //   `${apiVersion}/controllers/developer/students/students.php`,
  //   "get", //method
  //   "students", //key
  // );

  const allStudents = result?.pages.flatMap((page) => page.data) ?? [];

  const studentArray =
    allStudents.map((item, key) => {
      return {
        ...item,
        counter: key + 1,
        id: item?.students_aid,
        name: `${item?.students_first_name} ${item?.students_last_name}`,
        studentId: item?.students_id,
        grade: `${item?.students_grade} - ${item?.students_section}`,
        gradeSection: `${item?.students_grade} - ${item?.students_section}`,
        status: item?.students_is_active ? "Active" : "Inactive",
        setIsAdd: (val) => dispatch(setIsAdd(val)),
        setIsArchive: (val) => dispatch(setIsArchive(val)),
        setIsRestore: (val) => dispatch(setIsRestore(val)),
        setIsDelete: (val) => dispatch(setIsDelete(val)),
        setItemEdit,
      };
    }) ?? [];

  return (
    <>
      {/* Filter and Search */}
      <div className="flex flex-wrap items-center justify-between gap-2 py-2 text-dark">
        {/* Filter */}
        <div>
          <div className="relative">
            <label htmlFor="">Status</label>
            <select
              name=""
              id=""
              className="w-28"
              onChange={(e) => {
                setFilterStatus(e.target.value);
              }}
            >
              <optgroup label="Select Status">
                <option value="">All</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </optgroup>
            </select>
          </div>
        </div>
        {/* Search */}
        <div className="relative">
          <SearchBar search={search} result={[]} isFetching={isFetching} />
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <ResponsiveTable
          isLoading={status == "pending"}
          isFetching={isFetching}
          error={error}
          data={studentArray}
          columns={studentColumns}
          dataItem={itemEdit}
          // queryKey="students" // for one records refetching
          queryKey={["students", ""]} // for multiple records refetching
          pathUrl={`/controllers/developer/students`} //this is for archive, restore, delete path api
        />
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
        {/* Total */}
        <div className="px-6 py-4 bg-gray-100 border-t border-black flex justify-between">
          <span className="text-sm text-gray-600">
            {result?.pages[0].total ?? allStudents.length} students
          </span>
        </div>
      </div>
    </>
  );
};

export default StudentsTable;
