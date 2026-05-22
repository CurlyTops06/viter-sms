import React from "react";
import { FaUser, FaUserTie } from "react-icons/fa";
import { classes } from "./classesData";

const ClassesCard = () => {
  return (
    <>
      {/* <!-- class sched --> */}
      <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* <!-- card --> */}
        {classes.map((classes) => (
          <div
            className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-2xl"
            key={classes.id}
          >
            {/* <!-- grade and section --> */}
            <div className="border-b px-5 py-4">
              <p className="text-black/80 font-bold">{classes.gradeSection}</p>
            </div>
            {/* <!-- details and action --> */}
            <div className="p-5">
              {/* <!-- details --> */}
              <div>
                {/* <!-- adviser --> */}
                <ul className="flex justify-between mb-3">
                  <li className="flex items-center text-gray-600">
                    <span className="mr-2">
                      <FaUserTie />
                    </span>
                    Adviser:
                  </li>
                  <li className="font-medium">{classes.adviser}</li>
                </ul>
                {/* <!-- student --> */}
                <ul className="flex justify-between mb-3">
                  <li className="flex items-center text-gray-600">
                    <span className="mr-2">
                      <FaUser />
                    </span>
                    Students:
                  </li>
                  <li className="font-medium">{classes.noOfStudents}</li>
                </ul>
                {/* <!-- buttons --> */}
                <div className="flex gap-3">
                  <button className="flex-1 border border-blue-500 text-black/80 py-2 rounded-xl text-sm cursor-pointer">
                    View Class
                  </button>

                  <button className="flex-1 border border-gray-500 text-black/80 py-2 rounded-xl text-sm cursor-pointer">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClassesCard;
