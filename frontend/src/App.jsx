import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import MainHome from "./pages/MainHome";
import Login from "./pages/Login";
import NewStudent from "./pages/NewStudent";
import Extension from "./pages/Extension";
import VivaVoceHome from "./pages/VivaVoceHome";
import AccountsHome from "./pages/AccountsHome";
import RegistrationHome from "./pages/RegistrationHome";
import NewRegistration from "./pages/NewRegistration";
import Accounts1 from "./components/Accounts3";
import Accounts2 from "./components/Accounts2";
import Accounts3 from "./components/Accounts1";
import ViewStudentsData from "./pages/ViewStudentsData";
import AdminsData from "./pages/AdminsData";
import GuidesData from "./pages/GuidesData";
import GuideChanges from "./pages/GuideChanges";
import PreCourses from "./pages/PreCourses";
import ViewCourses from "./pages/ViewCourses";
import CourseEnrolments from "./pages/CourseEnrolments";
import NewCourseEnrollments from "./pages/NewCourseEnrollments";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainHome />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: '/students',
      element: <ViewStudentsData />
    },
    {
      path: '/guides',
      element: <GuidesData />
    },
    {
      path: '/admins',
      element: <AdminsData />
    },
    {
      path: "/registration",
      element: <RegistrationHome />,
    },
    {
      path: "/registrations/newstudent",
      element: <NewStudent />,
    },
    {
      path: "/extension",
      element: <Extension />,
    },
    {
      path: "/guides/changes",
      element: <GuideChanges />,
    },
    {
      path: "/vivavoce",
      element: <VivaVoceHome />,
    },
    {
      path: "/courses",
      element: <PreCourses />,
    },
    {
      path: "/students/courses",
      element: <CourseEnrolments />,
    },
    {
      path: "/students/courses/new",
      element: <NewCourseEnrollments />,
    },
    {
      path: "/courses/view",
      element: <ViewCourses />,
    },
    {
      path: "/Accounts",
      element: <AccountsHome />,
    },
    {
      path: "/accounts/student",
      element: <Accounts1 />,
    },
    {
      path: "/accounts/second",
      element: <Accounts2 />,
    },
    {
      path: "/accounts/third",
      element: <Accounts3 />,
    },
    {
      path: "/precourses",
      element: <PreCourses />,
    },
    {
      path: "/*",
      element: <center><h1>Page Not Found</h1></center>,
    }
  ]);

  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;