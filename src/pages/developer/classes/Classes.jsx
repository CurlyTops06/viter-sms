import React from "react";
import useDocumentTitle from "../../../functions/custom-hooks/useDocumentTitle";
import Layout from "../Layout";
import Header from "../../../partials/Header";
import ClassesCard from "./ClassesCard";
import { StoreContext } from "@/store/StoreContext";
import { FaPlus } from "react-icons/fa";
import { setIsAdd } from "@/store/StoreAction";
import useQueryData from "@/functions/custom-hooks/useQueryData";
import { apiVersion, formatDate } from "@/functions/functions-general";
import ModalAddClasses from "./ModalAddClasses";

export const handleAction = (setIsOpen, setItemEdit, item) => {
  setIsOpen(true);
  setItemEdit(item);
};

const Classes = () => {
  useDocumentTitle("Classes | Student Management System");
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

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

  const {
    isLoading: isLoadingClasses,
    isFetching: isFetchingClasses,
    error: errorClasses,
    data: dataClasses,
  } = useQueryData(
    `${apiVersion}/controllers/developer/classes/classes.php`,
    "get",
    "classes",
  );
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
  const classesArray =
    dataClasses?.data.map((item) => {
      return {
        ...item,
        id: item.classes_aid,
        gradeSection: `${item.classes_grade} - ${item.classes_section}`,
        adviser: `${item.teachers_last_name}, ${item.teachers_first_name}`,
        noOfStudents: `${formatDate(item.school_year_start)} - ${formatDate(item.school_year_end)}`,
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
            <div className="px-8 py-6">
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
            <div className="flex  px-8 pt-6">
              <div className="flex items-center gap-2 text-dark">
                <select className="filter-data">
                  <option>Grade 7</option>
                  <option>Grade 8</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                </select>
                <select className="filter-data">
                  <option>2025-2026</option>
                  <option>2024-2025</option>
                  <option>2023-2024</option>
                </select>
                <div className="flex gap-3 border border-gray-300 rounded-lg px-4 py-[4.5px] ">
                  <button className="statusBadge font-medium rounded-lg statusActive">
                    Active
                  </button>
                  <button className="statusBadge font-medium rounded-lg">
                    Archived
                  </button>
                  <button className="statusBadge font-medium rounded-lg">
                    Inactive
                  </button>
                </div>
                <input type="text" placeholder="Search here..." />
              </div>
            </div>
            <ClassesCard
              itemEdit={itemEdit}
              setItemEdit={setItemEdit}
              isLoading={isLoadingClasses}
              isFetching={isFetchingClasses}
              error={errorClasses}
              data={classesArray}
              dataItem={itemEdit}
              queryKey={["classes", ""]}
              pathUrl={`/controllers/developer/classes`}
            />
          </>
        )}
      </Layout>
      {store.isAdd && (
        <ModalAddClasses
          itemEdit={itemEdit}
          dataSchoolYear={dataSchoolYear}
          setIsOpen={(val) => dispatch(setIsAdd(val))}
        />
      )}
    </>
  );
};

export default Classes;
