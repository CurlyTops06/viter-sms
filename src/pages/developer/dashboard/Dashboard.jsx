import React from "react";
import Layout from "../Layout";
import Navigation from "../../../partials/Navigation";
import Header from "../../../partials/Header";
import StatCard from "./StatCard";
import {
  FaArrowRight,
  FaEdit,
  FaSchool,
  FaUser,
  FaUserGraduate,
  FaUsers,
  FaTrash,
} from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";
import useDocumentTitle from "../../../functions/custom-hooks/useDocumentTitle";
import StudentTable from "../students/StudentTable";
import { students } from "../students/studentsData";
import { teachers } from "../teachers/teachersData";
import { classes } from "../classes/classesData";

const Dashboard = () => {
  useDocumentTitle("Dashboard | School Management System");
  const stats = [
    {
      title: "Total Students",
      value: students.length,
      trend: true,
      trendLabel: "+12% from last month",
      icon: <FaUserGraduate />,
      color: "blue",
    },
    {
      title: "Total Teachers",
      value: teachers.length,
      trend: true,
      trendLabel: "+2% new this year",
      icon: <FaChalkboardUser />,
      color: "green",
    },
    {
      title: "Total Classes",
      value: classes.length,
      trend: false,
      trendLabel: "Grade 7 to Grade 12",
      icon: <FaSchool />,
      color: "purple",
    },
  ];

  return (
    <>
      <Layout menu="dashboard">
        {({ onToggle }) => (
          <>
            <Header
              title="Dashboard"
              description="Welcome back! Here's your school overview"
              onToggle={onToggle}
            />
            {/* Cards */}
            <div className="px-8 py-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
              ))}
            </div>

            <div className="px-8 py-6">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 md:px-6 md:py-5 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <h3 className="flex items-center text-lg font-semibold text-gray-800">
                      <FaUsers className="text-blue-500 mr-2" />
                      Recent Students
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Latest 5 students added to the system
                    </p>
                  </div>
                  <a
                    href="./students.html"
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition"
                  >
                    View All <FaArrowRight className="ml-1" />
                  </a>
                </div>
                <StudentTable students={students} />
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default Dashboard;
