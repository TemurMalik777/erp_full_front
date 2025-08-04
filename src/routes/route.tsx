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
  Course,
  ProtectChildrem,
  LoginChildren,
  Branch,
  Worker,
  Groups,
  SingleGroup,
  Notfoun,
  Room,
  Reducer,
  StarryNight,
  Dashboard,
} from "@pages";

const App = lazy(() => import("../App"));

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route
          index
          element={
            <LoginChildren>
              <SignIn />
            </LoginChildren>
          }
          
        />
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="admin/"
          element={
            <ProtectChildrem>
              <AdminLayout />
            </ProtectChildrem>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="groups" element={<Groups />} />
          <Route path="courses" element={<Course />} />
          <Route path="branches" element={<Branch />} />
          <Route path="student" element={<StudentLayout />} />
          <Route path="teacher" element={<TeacherLayout />} />
          <Route path="groups/:id" element={<SingleGroup />} />
          {/* <Route path="profile/:id" element={</>}/> */}
          <Route path="rooms" element={<Room />} />
          <Route path="reducer" element={<Reducer />} />
        </Route>
        <Route path="nightt" element={<StarryNight />} />
        <Route path="worker" element={<Worker />} />
        <Route path="*" element={<Notfoun />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
