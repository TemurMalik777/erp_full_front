import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { lazy } from "react";
import {
  SignIn,
  SignUp,
  AdminLayout,
  TeacherLayout,
  StudentLayout,
  Groups,
  Course,
} from "@pages";
const App = lazy(() => import("../App"));

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        {/* AdminLayout */}
        <Route path="admin/" element={<AdminLayout />}>
          <Route index element={<Groups />} />
          {/* <Route path="group" element={<Groups />} /> */}
        <Route path="courses" element={<Course />}/>
        <Route path="student" element={<StudentLayout />}></Route>
        <Route path="teacher" element={<TeacherLayout />}></Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
