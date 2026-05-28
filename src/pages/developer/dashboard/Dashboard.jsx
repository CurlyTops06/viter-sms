import React from "react";
import {
  FaArrowRight,
  FaSchool,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useDocumentTitle from "../../../functions/custom-hooks/useDocumentTitle";
import useQueryData from "../../../functions/custom-hooks/useQueryData";
import {
  apiVersion,
  devNavUrl,
  urlDeveloper,
} from "../../../functions/functions-general";
import Header from "../../../partials/Header";
import Layout from "../Layout";
import { classes } from "../classes/classesData";
import StudentTable from "../students/StudentTable";
import StatCard from "./StatCard";

export const handleAction = (setIsOpen, setItemEdit, item) => {
  setIsOpen(true);
  setItemEdit(item);
};

const Dashboard = () => {
  useDocumentTitle("Dashboard | School Management System");
  const [itemEdit, setItemEdit] = React.useState(null);

  const { data: dataStudents } = useQueryData(
    `${apiVersion}/controllers/developer/students/students.php`,
    "get", //method
    "students", //key
  );
  const studentArray = dataStudents?.data.length ?? [];
  const { data: dataTeachers } = useQueryData(
    `${apiVersion}/controllers/developer/teachers/teachers.php`,
    "get", //method
    "teachers", //key
  );
  const teacherArray = dataTeachers?.data.length ?? [];
  const stats = [
    {
      title: "Total Students",
      value: studentArray,
      trend: true,
      trendLabel: "+12% from last month",
      icon: <FaUserGraduate />,
      color: "blue",
      loc: "students",
    },
    {
      title: "Total Teachers",
      value: teacherArray,
      trend: true,
      trendLabel: "+2% new this year",
      icon: <FaChalkboardUser />,
      color: "green",
      loc: "teachers",
    },
    {
      title: "Total Classes",
      value: classes.length,
      trend: false,
      trendLabel: "Grade 7 to Grade 12",
      icon: <FaSchool />,
      color: "purple",
      loc: "classes",
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
            <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
              ))}
            </div>

            <div className="px-8 py-6">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 md:px-6 md:py-5 border-b border-black  flex justify-between items-center">
                  <div>
                    <h3 className="flex items-center text-lg font-semibold text-gray-800">
                      <FaUsers className="text-blue-500 mr-2" />
                      Recent Students
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Latest 5 students added to the system
                    </p>
                  </div>
                  <Link
                    to={`${devNavUrl}/${urlDeveloper}/students`}
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition"
                  >
                    View All <FaArrowRight className="ml-1" />
                  </Link>
                </div>
                <StudentTable itemEdit={itemEdit} setItemEdit={setItemEdit} />
                {/* <TableLoading count={20} cols={10} />
                <NoData />
                <ServerError /> */}
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default Dashboard;
