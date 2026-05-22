import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaSchool, FaUser } from "react-icons/fa";
import { FaGaugeHigh, FaXmark } from "react-icons/fa6";
import { devNavUrl, urlDeveloper } from "../functions/functions-general";

const Navigation = ({
  navigationList = [],
  menu = "",
  submenu = "",
  isOpen,
  onClose,
}) => {
  const location = useLocation();

  return (
    <>
      <aside
        id="mainSidebar"
        className={`
    fixed lg:static inset-y-0 left-0 z-30
    flex flex-col h-full              {/* ← add these two */}
    w-75 bg-white shadow-lg lg:shadow-xl
    transition-transform duration-300 ease-in-out
    lg:translate-x-0
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <Link to={`${devNavUrl}/${urlDeveloper}/dashboard`}>
          <div className="px-6 py-8 border-b border-gray-100">
            <div className="flex items-center gap-5">
              {/* Icon - prevent shrinking */}
              <div className="w-10 h-10 shrink-0 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg text-white text-xl">
                <FaSchool />
              </div>

              {/* Title - let this grow and take available space */}
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-800">SchoolMS</h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  School Management
                </p>
              </div>

              {/* Close button - prevent shrinking, mobile only */}
              <div className="shrink-0 lg:hidden">
                <button
                  id="closeSidebarBtn"
                  onClick={onClose}
                  className="cursor-pointer text-gray-500 hover:text-blue-500 text-xl duration-300"
                >
                  <FaXmark />
                </button>
              </div>
            </div>
          </div>
        </Link>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigationList?.map((item, key) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={key}>
                <Link
                  to={item.path}
                  className={`navItem ${isActive ? "active" : ""}`}
                >
                  <span>{item.icon}</span>
                  <p>{item.label}</p>
                </Link>
              </li>
            );
          })}
        </nav>

        <div className="px-4 py-6 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50">
            <div className="size-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md text-white text-sm">
              <FaUser />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">admin@schoolms.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
