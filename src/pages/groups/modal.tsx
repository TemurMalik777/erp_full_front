// import React from "react";
// import {
//   Modal,
//   Input,
//   DatePicker,
//   Select,
//   Form as AntForm,
//   Button,
// } from "antd";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import dayjs from "dayjs";

// const { Option } = Select;
// // const {mutate, isPending} = useGroupCreate()
// export interface Group {
//   name: string;
//   course_id: number;
//   status: string;
//   start_date: string;
//   end_date: string;
// }

// interface Course {
//   id: number;
//   title: string;
// }

// interface GroupModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSubmit: (values: Group) => void;
//   editData?: Group;
//   courses: Course[];
// }

// const validationSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   course_id: Yup.number().required("Please select a course"),
//   status: Yup.string().required("Please select a status"),
//   start_date: Yup.string().required("Start date is required"),
//   end_date: Yup.string().required("End date is required"),
// });

// const GroupModal: React.FC<GroupModalProps> = ({
//   visible,
//   onClose,
//   onSubmit,
//   editData,
//   courses,
// }) => {
//   const initialValues: Group = editData || {
//     name: "",
//     course_id: 0,
//     status: "",
//     start_date: "",
//     end_date: "",
//   };

//   return (
//     <Modal
//       title={editData ? "Edit groups" : "Add groups"}
//       open={visible}
//       onCancel={onClose}
//       footer={null}
//     >
//       <Formik
//         enableReinitialize
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//       >
//         {({ setFieldValue, values }) => (
//           <Form>
//             <AntForm.Item label="Groups name"  labelCol={{ span: 24 }}>
//               <Field as={Input} name="name" placeholder="Groups name" />
//               <ErrorMessage name="name" component="div" />
//             </AntForm.Item>

//             <AntForm.Item label="Course"  labelCol={{ span: 24 }}>
//               <Select
//                 value={values.course_id || undefined}
//                 onChange={(value) => setFieldValue("course_id", value)}
//                 placeholder="Choose course"
//                 style={{ width: "100%" }}
//               >
//                 {courses.map((course) => (
//                   <Option key={course.id} value={course.id}>
//                     {course.title}
//                   </Option>
//                 ))}
//               </Select>
//               <ErrorMessage name="course_id" component="div" />
//             </AntForm.Item>

//             <AntForm.Item label="Status"  labelCol={{ span: 24 }}>
//               <Select
//                 value={values.status || undefined}
//                 onChange={(value) => setFieldValue("status", value)}
//                 placeholder="Choose status"
//               >
//                 <Option value="active">Active</Option>
//                 <Option value="new">New</Option>
//                 <Option value="padding">Padding</Option>
//               </Select>
//               <ErrorMessage name="status" component="div" />
//             </AntForm.Item>

//             <AntForm.Item label="Start date"  labelCol={{ span: 24 }}>
//               <DatePicker
//                 style={{ width: "100%" }}
//                 value={values.start_date ? dayjs(values.start_date) : undefined}
//                 onChange={(_, dateString) =>
//                   setFieldValue("start_date", dateString)
//                 }
//               />
//               <ErrorMessage name="start_date" component="div" />
//             </AntForm.Item>

//             <AntForm.Item label="End date"  labelCol={{ span: 24 }}>
//               <DatePicker
//                 style={{ width: "100%" }}
//                 value={values.end_date ? dayjs(values.end_date) : undefined}
//                 onChange={(_, dateString) =>
//                   setFieldValue("end_date", dateString)
//                 }
//               />
//               <ErrorMessage name="end_date" component="div" />
//             </AntForm.Item>
//             <Button type="primary" htmlType="submit"
//             // loading={isPending}
//             block>
//               Save
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Modal>
//   );
// };

// export default GroupModal;

import {
  Modal,
  Input,
  Form as AntForm,
  DatePicker,
  Select,
  Button,
} from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import type { Course, Group } from "@types";
import { useCourse, useGroup } from "@hooks";

const { Option } = Select;

interface GroupModalProps {
  open: boolean;
  toggle: () => void;
  update: Group | null;
  mode: "create" | "update";
}

const GroupModal: React.FC<GroupModalProps> = ({
  open,
  toggle,
  update,
  mode,
}) => {
  const { useGroupCreate, useGroupUpdate } = useGroup({ page: 1, limit: 10 });
  const { mutate: createFn, isPending: isCreating } = useGroupCreate();
  const { mutate: updateFn, isPending: isUpdating } = useGroupUpdate();
  // const { data: courses } = useCourse();
  // const { courses } = useCourse();
const { courses = [] }: { courses?: Course[] } = useCourse();

  const isLoading = isCreating || isUpdating;

  const initialValues: Group = {
    name: update?.name || "",
    course_id: update?.course_id || 0,
    status: update?.status || "active",
    start_date: update?.start_date || "",
    end_date: update?.end_date || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Nomi majburiy"),
    course_id: Yup.number().required("Kurs ID majburiy"),
    status: Yup.string().required("Status majburiy"),
    start_date: Yup.string().required("Boshlanish sanasi kerak"),
    end_date: Yup.string().required("Tugash sanasi kerak"),
  });

  const handleSubmit = (values: Group) => {
    if (mode === "create") {
      createFn(values, { onSuccess: toggle });
    } else if (mode === "update" && update?.id) {
      updateFn({ model: values, id: update.id }, { onSuccess: toggle });
    }
  };

  return (
    <Modal
      open={open}
      title={mode === "create" ? "Yangi guruh qo'shish" : "Guruhni tahrirlash"}
      onCancel={toggle}
      footer={null}
      destroyOnHidden
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ setFieldValue, values }) => (
          <Form>
            <AntForm.Item label="Nomi">
              <Field name="name" as={Input} />
              <ErrorMessage
                name="name"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
            </AntForm.Item>

            {/* <AntForm.Item label="Kurs ID">
              <Field name="course_id" as={Input} type="number" />
              <ErrorMessage name="course_id" render={msg => <div style={{ color: "red" }}>{msg}</div>} />
            </AntForm.Item> */}

            <AntForm.Item label="Course" labelCol={{ span: 24 }}>
              {/* <Select
                value={values.course_id || undefined}
                onChange={(value) => setFieldValue("course_id", value)}
                placeholder="Choose course"
                style={{ width: "100%" }}
              >
                {courses?.data?.map((course: any) => (
                  <Option key={course.id} value={course.id}>
                  {course.title}
                  </Option>
                ))}
              </Select> */}
              <Select
                value={values.course_id || undefined}
                onChange={(value) => setFieldValue("course_id", value)}
                placeholder="Choose course"
                style={{ width: "100%" }}
              >
                {courses.map((course) => (
                  <Option key={course.id} value={course.id}>
                    {course.title}
                  </Option>
                ))}
              </Select>

              <ErrorMessage name="course_id" component="div" />
            </AntForm.Item>

            <AntForm.Item label="Holati">
              <Field name="status" as={Select} style={{ width: "100%" }}>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Field>
              <ErrorMessage
                name="status"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
            </AntForm.Item>

            <AntForm.Item label="Boshlanish sanasi">
              <DatePicker
                style={{ width: "100%" }}
                value={values.start_date ? dayjs(values.start_date) : null}
                onChange={(_, dateString) =>
                  setFieldValue("start_date", dateString)
                }
              />
              <ErrorMessage
                name="start_date"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
            </AntForm.Item>

            <AntForm.Item label="Tugash sanasi">
              <DatePicker
                style={{ width: "100%" }}
                value={values.end_date ? dayjs(values.end_date) : null}
                onChange={(_, dateString) =>
                  setFieldValue("end_date", dateString)
                }
              />
              <ErrorMessage
                name="end_date"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
            </AntForm.Item>

            <AntForm.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
              >
                {mode === "create" ? "Qo'shish" : "Saqlash"}
              </Button>
            </AntForm.Item>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default GroupModal;
