import React from "react";
import useDocumentTitle from "../../../functions/custom-hooks/useDocumentTitle";
import Layout from "../Layout";
import Header from "../../../partials/Header";
import ClassesCard from "./ClassesCard";

const Classes = () => {
  useDocumentTitle("Classes | Student Management System");
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
            <ClassesCard />
          </>
        )}
      </Layout>
    </>
  );
};

export default Classes;
