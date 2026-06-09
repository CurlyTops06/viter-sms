import React from "react";
import useDocumentTitle from "../../../functions/custom-hooks/useDocumentTitle";
import Layout from "../Layout";
import Header from "../../../partials/Header";
import ClassesCard from "./ClassesCard";
import { StoreContext } from "@/store/StoreContext";
import { FaPlus } from "react-icons/fa";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "@/store/StoreAction";
import useQueryData from "@/functions/custom-hooks/useQueryData";
import { apiVersion, formatDate } from "@/functions/functions-general";
import ModalAddClasses from "./ModalAddClasses";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryDataInfinite } from "@/functions/custom-hooks/queryDataInfinite";
import { useInView } from "react-intersection-observer";
import Loadmore from "@/partials/Loadmore";
import SearchBar from "@/partials/SearchBar";

export const handleAction = (setIsOpen, setItemEdit, item) => {
  setIsOpen(true);
  setItemEdit(item);
  // console.log(item);
};

const Classes = () => {
  useDocumentTitle("Classes | Student Management System");
  const { store, dispatch } = React.useContext(StoreContext);
  const [filterStatus, setFilterStatus] = React.useState("");
  const [filterGrade, setFilterGrade] = React.useState("");
  const [filterSchoolYear, setFilterSchoolYear] = React.useState("");
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();
  const [page, setPage] = React.useState(1);
  const [itemEdit, setItemEdit] = React.useState(null);

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [
      "classes",
      search?.current.value,
      store.isSearch,
      filterStatus,
      filterGrade,
      filterSchoolYear,
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `${apiVersion}/controllers/developer/classes/page.php?start=${pageParam}`,
        store.isSearch,
        {
          filterStatus,
          searchValue: search?.current.value,
          filterGrade,
          filterSchoolYear,
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

  const {
    isLoading: isLoadingSchoolYear,
    isFetching: isFetchingSchoolYear,
    error: errorSchoolYear,
    data: dataSchoolYear,
  } = useQueryData(
    `${apiVersion}/controllers/developer/school-year/school-year.php`,
    "get",
    "school-year",
  );
  const filterActiveSchoolYear = dataSchoolYear?.data.filter(
    (data) => data.school_year_is_active == 1,
  );
  // const {
  //   isLoading: isLoadingClasses,
  //   isFetching: isFetchingClasses,
  //   error: errorClasses,
  //   data: dataClasses,
  // } = useQueryData(
  //   `${apiVersion}/controllers/developer/classes/classes.php`,
  //   "get",
  //   "classes",
  // );
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
  const { data: dataStudents } = useQueryData(
    `${apiVersion}/controllers/developer/students/students.php`,
    "get",
    "students",
  );

  const allClasses = result?.pages.flatMap((page) => page.data) ?? [];
  const classesArray =
    allClasses.map((item, key) => {
      return {
        ...item,
        id: item?.classes_aid,
        classes_is_active: item?.classes_is_active,
        gradeSection: `${item?.classes_grade} - ${item?.classes_section}`,
        adviser: `${item?.classes_adviser}`,
        noOfStudents: `${formatDate(item?.school_year_start)} - ${formatDate(item?.school_year_end)}`,
        setIsAdd: (val) => dispatch(setIsAdd(val)),
        setIsArchive: (val) => dispatch(setIsArchive(val)),
        setIsRestore: (val) => dispatch(setIsRestore(val)),
        setIsDelete: (val) => dispatch(setIsDelete(val)),
        setItemEdit,
      };
    }) ?? [];

  return (
    <>
      <Layout menu="classes">
        {({ onToggle }) => (
          <>
            <Header
              title="Classes Organization"
              description="Manage school classes and sections"
              onToggle={onToggle}
            />
            {/* <!-- note --> */}
            <div className="bg-white p-2 text-center shadow-sm">
              <small>
                Note: The list for all classes will be available soon.
              </small>
            </div>
            <div className="px-8 pt-6">
              <div className="flex justify-end items-center">
                <button
                  className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                  onClick={() =>
                    handleAction(
                      (val) => dispatch(setIsAdd(val)),
                      setItemEdit,
                      null,
                    )
                  }
                >
                  <FaPlus /> Add Class
                </button>
              </div>
            </div>
            <div className="block lg:flex px-8 pt-6 justify-items-center items-center align-middle justify-between">
              <div className="block lg:flex w-full lg:w-auto gap-2 items-center align-middle text-dark relative">
                <select
                  className="filter-data flex w-full mb-2 text-center"
                  onChange={(e) => {
                    setFilterGrade(e.target.value);
                  }}
                >
                  <option value="">All  </option>
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                </select>
                <select
                  className="filter-data w-full flex mb-2 text-center"
                  onChange={(e) => {
                    setFilterSchoolYear(e.target.value);
                  }}
                >
                  {filterActiveSchoolYear?.map((item, key) => {
                    return (
                      <option key={key} value={item.school_year_aid}>
                        {formatDate(item.school_year_start)} - {""}
                        {formatDate(item.school_year_end)}
                      </option>
                    );
                  })}
                </select>

                <div className="w-auto xl:w-auto flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-[4.5px] mb-2">
                  <button
                    className="statusBadge font-medium rounded-lg "
                    onClick={(e) => {
                      setFilterStatus(e.target.value);
                    }}
                    value=""
                  >
                    All
                  </button>
                  <button
                    className="statusBadge font-medium rounded-lg statusActive"
                    onClick={(e) => {
                      setFilterStatus(e.target.value);
                    }}
                    value="1"
                  >
                    Active
                  </button>
                  <button
                    className="statusBadge font-medium rounded-lg statusInactive"
                    onClick={(e) => {
                      setFilterStatus(e.target.value);
                    }}
                    value="0"
                  >
                    Inactive
                  </button>
                </div>
              </div>
              <div className="relative w-full lg:w-auto">
                <SearchBar
                  search={search}
                  result={[]}
                  isFetching={isFetching}
                />
              </div>
            </div>
            <ClassesCard
              itemEdit={itemEdit}
              setItemEdit={setItemEdit}
              isLoading={status == "pending"}
              isFetching={isFetching}
              error={error}
              data={classesArray}
              dataItem={itemEdit}
              queryKey={["classes", ""]}
              pathUrl={`controllers/developer/classes`}
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
          </>
        )}
      </Layout>
      {store.isAdd && (
        <ModalAddClasses
          itemEdit={itemEdit}
          dataSchoolYear={dataSchoolYear}
          dataTeachers={dataTeachers}
          dataStudents={dataStudents}
          setIsOpen={(val) => dispatch(setIsAdd(val))}
        />
      )}
    </>
  );
};

export default Classes;
