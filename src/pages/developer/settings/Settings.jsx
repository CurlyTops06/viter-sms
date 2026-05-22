import React from "react";
import useDocumentTitle from "../../../functions/custom-hooks/useDocumentTitle";
import Header from "../../../partials/Header";
import Layout from "../Layout";

const Settings = () => {
  useDocumentTitle("Teachers | School Management System");
  return (
    <>
      <Layout menu="students">
        {({ onToggle }) => (
          <>
            <Header
              title="Settings"
              description="System preferences and account settings"
              onToggle={onToggle}
            />
            {/* Settings Card */}
            <div className="px-8 py-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl w-auto md:w-md lg:w-xl">
                <h2 className="text-black text-sm font-semibold mb-3">
                  Profile Information
                </h2>
                <form>
                  <h3 className="text-gray-800 text-sm font-light mb-2">
                    Admin Name
                  </h3>
                  <input
                    className="p-2 text-black border-gray-300 border rounded-2xl mb-3 w-full"
                    type="text"
                    placeholder="Admin User"
                  />
                  <h3 className="text-gray-800 text-sm font-light mb-2">
                    Email Address
                  </h3>
                  <input
                    className="p-2 text-black border border-gray-300 rounded-2xl mb-9 w-full"
                    type="email"
                    placeholder="admin@schoolms.com"
                  />
                  <button className="flex bg-red-600 text-white text-md px-4 py-2 rounded-xl cursor-pointer hover:shadow-xl">
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default Settings;
