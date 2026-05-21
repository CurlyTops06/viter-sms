import React from "react";
import { FaArrowUp } from "react-icons/fa";

const colorMap = {
  blue: {
    border: "border-blue-500",
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  green: {
    border: "border-green-500",
    bg: "bg-green-100",
    text: "text-green-600",
  },
  purple: {
    border: "border-purple-500",
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
};

const StatCard = ({ title, value, trend, trendLabel, icon, color }) => {
  const c = colorMap[color];
  return (
    <>
      <div
        className={`bg-white rounded-2xl p-6 border-l-4 ${c.border} shadow-sm hover:shadow-xl transition-all`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
            <h4 className="text-4xl font-bold text-gray-800">{value}</h4>
            <small
              className={`text-xs ${trend ? "text-green-600" : "text-gray-600"} mt-2 flex items-center gap-1`}
            >
              {trend && <FaArrowUp />}
              {trendLabel}
            </small>
          </div>
          <span
            className={`size-14 ${c.bg} rounded-2xl flex items-center justify-center ${c.text} text-2xl`}
          >
            {icon}
          </span>
        </div>
      </div>
    </>
  );
};

export default StatCard;
