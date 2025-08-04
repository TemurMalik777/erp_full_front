import { lazy } from "react";

const SignIn = lazy(() => import("./auth/sign-in"));
const SignUp = lazy(() => import("./auth/sign-up"));
const AdminLayout = lazy(() => import("./admin-layout/admin"));
const AdminProfile = lazy(() => import("./admin-layout/admin-profile"));
const Dashboard = lazy(() => import("./admin-dashboart.txs/Dashboart"));
const TeacherLayout = lazy(() => import("./teacher-layout/teacher"));
const StudentLayout = lazy(() => import("./student-layout/student"));
const Groups = lazy(() => import("./groups/group"));
const Course = lazy(() => import("./courses/courses"));
const Student = lazy(() => import("./student-layout/student"));
const ProtectChildrem = lazy(() => import("./protect-route/layout-protect"));
const LoginChildren = lazy(() => import("./protect-route/login-protect"));
const Branch = lazy(() => import("./branch/branch"));
const Worker = lazy(() => import("./worker/worker"));
const Reducer = lazy(() => import("./worker/useReducer"));
const SingleGroup = lazy(() => import("./groups/single-group"));
const Notfoun = lazy(() => import("./not-found/notfound"));
const Room = lazy(() => import("./rooms/room"));
const StarryNight = lazy(() => import("./night/night"));

export {
  SignIn,
  SignUp,
  AdminLayout,
  AdminProfile,
  Dashboard,
  TeacherLayout,
  StudentLayout,
  Groups,
  Course,
  Student,
  ProtectChildrem,
  LoginChildren,
  Branch,
  Worker,
  SingleGroup,
  Notfoun,
  Room,
  Reducer,
  StarryNight,
};
