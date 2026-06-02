import {
  FaBuilding,
  FaChalkboardUser,
  FaGaugeHigh,
  FaGear,
  FaUserGraduate,
} from "react-icons/fa6";
import { devNavUrl, urlDeveloper } from "../functions/functions-general";
import { IoIosTime } from "react-icons/io";

export const navList = [
  {
    label: "Dashboard",
    icon: <FaGaugeHigh />,
    menu: "dashboard",
    path: `${devNavUrl}/${urlDeveloper}/dashboard`,
  },
  {
    label: "Students ",
    icon: <FaUserGraduate />,
    menu: "students",
    path: `${devNavUrl}/${urlDeveloper}/students`,
  },
  {
    label: "Teachers",
    icon: <FaChalkboardUser />,
    menu: "teachers",
    path: `${devNavUrl}/${urlDeveloper}/teachers`,
  },
  {
    label: "Classes",
    icon: <FaBuilding />,
    menu: "classes",
    path: `${devNavUrl}/${urlDeveloper}/classes`,
  },
  {
    label: "School Year",
    icon: <IoIosTime />,
    menu: "school-year",
    path: `${devNavUrl}/${urlDeveloper}/school-year`,
  },
  {
    label: "Settings",
    icon: <FaGear />,
    menu: "settings",
    path: `${devNavUrl}/${urlDeveloper}/settings`,
  },
];
