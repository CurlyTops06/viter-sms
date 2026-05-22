import { devNavUrl, urlDeveloper } from "../functions/functions-general";
import Classes from "../pages/developer/classes/Classes";
import Dashboard from "../pages/developer/dashboard/Dashboard";
import Settings from "../pages/developer/settings/Settings";
import Students from "../pages/developer/students/Students";
import Teachers from "../pages/developer/teachers/Teachers";

export const routesDeveloper = [
  {
    path: `${devNavUrl}/${urlDeveloper}/`,
    element: (
      <>
        <Dashboard />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/dashboard`,
    element: (
      <>
        <Dashboard />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/students`,
    element: (
      <>
        <Students />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/teachers`,
    element: (
      <>
        <Teachers />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/classes`,
    element: (
      <>
        <Classes />
      </>
    ),
  },
  {
    path: `${devNavUrl}/${urlDeveloper}/settings`,
    element: (
      <>
        <Settings />
      </>
    ),
  },
];
