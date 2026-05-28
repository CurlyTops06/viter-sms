import React from "react";
import { FaPlus } from "react-icons/fa";
import useDocumentTitle from "../../../functions/custom-hooks/useDocumentTitle";
import Header from "../../../partials/Header";
import { setIsAdd } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import Layout from "../Layout";
import ModalAddStudents from "./ModalAddStudents";
import StudentTable from "./StudentTable";

export const handleAction = (setIsOpen, setItemEdit, item) => {
  setIsOpen(true);
  setItemEdit(item);
};
const Students = () => {
  useDocumentTitle("Students | School Management System");
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  return (
    <>
      <Layout menu="students">
        {({ onToggle }) => (
          <>
            <Header
              title="Students Management"
              description="Manage all student records"
              onToggle={onToggle}
            />
            {/* Add Button */}
            <div className="px-8 py-6">
              <div className="flex justify-end items-center mb-6">
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
                  <FaPlus /> Add Student
                </button>
              </div>
              {/* List of Students */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <StudentTable itemEdit={itemEdit} setItemEdit={setItemEdit} />
              </div>
            </div>
          </>
        )}
      </Layout>
      {store.isAdd && (
        <ModalAddStudents
          itemEdit={itemEdit}
          setIsOpen={(val) => dispatch(setIsAdd(val))}
        />
      )}
    </>
  );
};

export default Students;
