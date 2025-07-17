import * as Yup from "yup";

export const CourseValidation = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Must be a number")
    .min(0)
    .integer()
    .required("Price is required"),
  duration: Yup.string().required("Duration is required"),
  lessons_in_a_week: Yup.number()
    .typeError("Must be a number")
    .min(1)
    .required("Lessons per week is required"),
  lesson_duration: Yup.string().required("Lesson duration is required"),
});
