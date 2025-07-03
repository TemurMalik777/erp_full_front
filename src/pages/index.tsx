import { lazy } from "react";

const SignIn = lazy(() => import("./auth/sign-in"));
const SignUp = lazy(() => import("./auth/sign-up"));
const AdminLayout = lazy(() => import("./admin-layout/admin"));
const TeacherLayout = lazy(() => import("./teacher-layout/teacher"));
const StudentLayout = lazy(() => import("./student-layout/student"));
const Groups = lazy(() => import("./groups/group"));

export { SignIn, SignUp, AdminLayout, TeacherLayout, StudentLayout, Groups };
