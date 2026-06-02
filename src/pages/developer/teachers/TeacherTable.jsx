import React from "react";
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
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "@/functions/custom-hooks/queryDataInfinite";
import { useInView } from "react-intersection-observer";
import SearchBar from "@/partials/SearchBar";
import Loadmore from "@/partials/Loadmore";

const TeacherColumns = [
  {
    key: "counter",
    header: "#",
    render: (teacher) => <p>{teacher.counter}.</p>,
    mobileLabel: null,
  },
  {
    key: "name",
    header: "Name",
    render: (teacher, key) => (
      <div className=" items-center gap-3 text-black flex">
        <div className="size-8 bg-blue-100 rounded-full flex items-center justify-center">
          <FaUser className="text-blue-600 text-sm" />
        </div>
        <div>
          <p className="font-medium">{teacher.name}</p>
          <p className="text-xs text-gray-500 xl:hidden">{teacher.subject}</p>
        </div>
      </div>
    ),
    mobileLabel: "",
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
    queryKey: ["teachers", search?.current.value, store.isSearch, filterStatus],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${apiVersion}/controllers/developer/teachers/page.php?start=${pageParam}`,
        store.isSearch,
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
      return;
    },
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  // const {
  //   isLoading: isLoadingTeachers,
  //   isFetching: isFetchingTeachers,
  //   error: errorTeachers,
  //   data: dataTeachers,
  // } = useQueryData(
  //   `${apiVersion}/controllers/developer/teachers/teachers.php`,
  //   "get",
  //   "teachers",
  // );

  const allTeachers = result?.pages.flatMap((page) => page.data) ?? [];

  const teacherArray =
    allTeachers.map((item, key) => {
      return {
        ...item,
        counter: key + 1,
        id: item?.teachers_aid,
        name: `${item?.teachers_honorific} ${item?.teachers_first_name} ${item?.teachers_last_name}`,
        subject: `${item?.teachers_subject}`,
        email: `${item?.teachers_email}`,
        status: item?.teachers_is_active ? "Active" : "Inactive",
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
          data={teacherArray}
          columns={TeacherColumns}
          dataItem={itemEdit}
          queryKey={["teachers", ""]}
          pathUrl={`/controllers/developer/teachers`}
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
            {result?.pages[0].total ?? allTeachers.length} teachers
          </span>
        </div>
      </div>
    </>
  );
};

export default TeacherTable;
