import * as Yup from "yup";
//--Branch--
export const BranchValidation = Yup.object({
  name: Yup.string()
    .trim()
    .max(50, "Branch nomi 50 belgidan oshmasligi kerak")
    .required("Branch nomi majburiy"),
    
  address: Yup.string()
    .trim()
    .required("Manzil majburiy"),

  call_number: Yup.string()
    .required("Telefon raqam majburiy"),
});



//--Course--
export const CourseValidation = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  duration: Yup.number()
    .typeError("Duration must be a number")
    .required("Duration is required"),
  lessons_in_a_week: Yup.number()
    .typeError("Lessons per week must be a number")
    .required("Lessons per week is required"),
  lessons_in_a_month: Yup.number()
    .typeError("Lessons per week must be a number")
    .required("Lessons per week is required"),
  lesson_duration: Yup.number()
    .typeError("Lesson duration must be a number")
    .required("Lesson duration is required"),
});




//--Group--
export const GroupValidation = Yup.object({
  name: Yup.string().required("Name is required"),
  course_id: Yup.number().required("Course is required"),
  status: Yup.string()
    .oneOf(["active", "inactive"], "Invalid status")
    .required("Status is required"),
  start_date: Yup.string().required("Start date is required"),
  end_date: Yup.string().required("End date is required"),
  start_time: Yup.string().required("Start date is required"),
  end_time: Yup.string().required("End date is required"),
  roomId: Yup.number().required("Course is required"),
    course: Yup.object({
    id: Yup.number()
      .typeError("Course is required")
      .required("Course is required"),
  }).required("Course object is required"),
});



//--Student--
export const StudentValidation = (isEdit: boolean) =>
  Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
    date_of_birth: Yup.string().required("Date of birth is required"),
    ...(isEdit
      ? {}
      : {
          password_hash: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
          confirm_password: Yup.string()
            .oneOf([Yup.ref("password_hash")], "Passwords do not match")
            .required("Confirm password is required"),
        }),
  });

//-Taecher--
export const TeacherValidation = (isEdit: boolean) =>
  Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    role: Yup.string().required("Role is required"),
    ...(isEdit
      ? {}
      : {
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        }),
  });



//--Sign-In--
export const SignInValidation = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address!")
    .required("Please input your email!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters!")
    .required("Please input your password!"),
  role: Yup.string().required("Please select your role!"),
});


//--Room--
export const RoomValidation = Yup.object({
  branchId: Yup.number()
    .typeError("Filial ID raqam bo'lishi kerak")
    .required("Filial ID majburiy"),
  name: Yup.string()
    .required("Xona nomi majburiy")
    .min(2, "Xona nomi kamida 2 ta belgidan iborat bo'lishi kerak"),
  capacity: Yup.number()
    .typeError("Sigim raqam bolishi kerak")
    .required("Sigim majburiy")
    .positive("Sigim musbat son bolishi kerak")
    .integer("Sigim butun son bolishi kerak"),
});
