import { FaPlus } from "react-icons/fa";
import useDocumentTitle from "../../../functions/custom-hooks/useDocumentTitle";
import Header from "../../../partials/Header";
import Layout from "../Layout";
import StudentTable from "./StudentTable";
import { students } from "./studentsData";

const Students = () => {
  useDocumentTitle("Students | School Management System");

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
                <button className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2">
                  <FaPlus /> Add Student
                </button>
              </div>

              {/* List of Students */}
              <div>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <StudentTable students={students} />
                  {/* Total */}
                  <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
                    <span className="text-sm text-gray-600">
                      {students.length} students
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default Students;
