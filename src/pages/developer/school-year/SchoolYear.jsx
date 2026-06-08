import React from "react";
import useDocumentTitle from "../../../functions/custom-hooks/useDocumentTitle";
import Layout from "../Layout";
import Header from "../../../partials/Header";
import { StoreContext } from "@/store/StoreContext";
import { FaPlus } from "react-icons/fa";
import { setIsAdd } from "@/store/StoreAction";
import useQueryData from "@/functions/custom-hooks/useQueryData";
import { apiVersion } from "@/functions/functions-general";
import ModalAddClasses from "./ModalAddSchoolYear";
import ModalAddSchoolYear from "./ModalAddSchoolYear";
import SchoolYearList from "./SchoolYearList";

export const handleAction = (setIsOpen, setItemEdit, item) => {
  setIsOpen(true);
  setItemEdit(item);
};

const SchoolYear = () => {
  useDocumentTitle("Classes | Student Management System");
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

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
  const classesArray =
    dataClasses?.data.map((item) => {
      return {
        ...item,
        id: item.classes_aid,
        gradeSection: `${item.classes_grade} - ${item.classes_section}`,
        adviser: `${item.classes_adviser}`,
        noOfStudents: `${item.classes_number_students}`,
        setIsAdd: (val) => dispatch(setIsAdd(val)),
        setIsArchive: (val) => dispatch(setIsArchive(val)),
        setIsRestore: (val) => dispatch(setIsRestore(val)),
        setIsDelete: (val) => dispatch(setIsDelete(val)),
        setItemEdit,
      };
    }) ?? [];

  return (
    <>
      <Layout menu="school-year">
        {({ onToggle }) => (
          <>
            <Header
              title="School Year"
              description="Manage school year"
              onToggle={onToggle}
            />
            {/* <!-- note --> */}
            <div className="bg-white p-2 text-center shadow-sm">
              <small>
                Note: The list for all School Year will be available soon.
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
                  <FaPlus /> Add School-Year
                </button>
              </div>
            </div>
            <SchoolYearList
              itemEdit={itemEdit}
              setItemEdit={setItemEdit}
              queryKey={["school-year", ""]}
              dataItem={itemEdit}
              pathUrl={`/controllers/developer/school-year`}
            />
          </>
        )}
      </Layout>
      {store.isAdd && (
        <ModalAddSchoolYear
          itemEdit={itemEdit}
          setIsOpen={(val) => dispatch(setIsAdd(val))}
        />
      )}
    </>
  );
};

export default SchoolYear;
