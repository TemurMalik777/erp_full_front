import * as Yup from "yup";

export const GroupValidation = Yup.object({
  name: Yup.string().required("Name is required"),
  course_id: Yup.number().required("Course is required"),
  status: Yup.string()
    .oneOf(["active", "inactive"], "Invalid status")
    .required("Status is required"),
  start_date: Yup.string().required("Start date is required"),
  end_date: Yup.string().required("End date is required"),
});
