import React from "react";
import useDocumentTitle from "../../../functions/custom-hooks/useDocumentTitle";
import Layout from "../Layout";
import Header from "../../../partials/Header";
import { FaPlus } from "react-icons/fa";
import TeacherTable from "./TeacherTable";
import { teachers } from "./teachersData";
import { setIsAdd } from "@/store/StoreAction";
import { StoreContext } from "@/store/StoreContext";
import ModalAddTeachers from "./ModalAddTeachers";

export const handleAction = (setIsOpen, setItemEdit, item) => {
  setIsOpen(true);
  setItemEdit(item);
};

const Teachers = () => {
  useDocumentTitle("Teachers | School Management System");
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  return (
    <>
      <Layout menu="teachers">
        {({ onToggle }) => (
          <>
            <Header
              title="Teachers Management"
              description="Manage all teacher records"
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
                  <FaPlus /> Add Teacher
                </button>
              </div>
              {/* List of Teachers */}
              <TeacherTable itemEdit={itemEdit} setItemEdit={setItemEdit} />
            </div>
          </>
        )}
      </Layout>
      {store.isAdd && (
        <ModalAddTeachers
          itemEdit={itemEdit}
          setIsOpen={(val) => dispatch(setIsAdd(val))}
        />
      )}
    </>
  );
};

export default Teachers;
