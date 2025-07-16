// import React from "react";
// import {
//   Modal,
//   Input,
//   Form as AntForm,
//   Button,
//   DatePicker,
//   InputNumber,
//   Select,
// } from "antd";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import dayjs from "dayjs";
// import { MaskedInput } from "antd-mask-input";

// export interface Student {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   password_hash: string;
//   confirm_password: string;
//   gender: string;
//   date_of_birth: string;
//   lidId: number;
// }

// interface StudentModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSubmit: (values: Student) => Promise<void>;
//   editData?: Student;
//   mode: "create" | "update";
// }

// const createValidationSchema = (isEdit: boolean) =>
//   Yup.object({
//     first_name: Yup.string().required("First name is required"),
//     last_name: Yup.string().required("Last name is required"),
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     phone: Yup.string().required("Phone number is required"),
//     gender: Yup.string().required("Gender is required"),
//     date_of_birth: Yup.string().required("Date of birth is required"),
//     lidId: Yup.number().required("Lid ID is required"),
//     ...(isEdit
//       ? {}
//       : {
//           password_hash: Yup.string()
//             .min(8, "Password must be at least 8 characters")
//             .required("Password is required"),
//           confirm_password: Yup.string()
//             .oneOf([Yup.ref("password_hash")], "Passwords do not match")
//             .required("Confirm password is required"),
//         }),
//   });

// const StudentModal: React.FC<StudentModalProps> = ({
//   visible,
//   onClose,
//   onSubmit,
//   editData,
//   mode
// }) => {
//   const isEdit = !!editData;

//   const initialValues: Student = {
//     first_name: editData?.first_name || "",
//     last_name: editData?.last_name || "",
//     email: editData?.email || "",
//     phone: editData?.phone || "",
//     password_hash: "",
//     confirm_password: "",
//     gender: editData?.gender || "",
//     date_of_birth: editData?.date_of_birth || "",
//     lidId: editData?.lidId || 0,
//   };

//   return (
//     <Modal
//       title={isEdit ? "Edit Student" : "Add Student"}
//       open={visible}
//       onCancel={onClose}
//       footer={null}
//       destroyOnHidden
//     >
//       <Formik
//         enableReinitialize
//         initialValues={initialValues}
//         validationSchema={createValidationSchema(isEdit)}
//         onSubmit={(values) => {
//           const { confirm_password, ...data } = values;
//           return onSubmit(data as Student);
//         }}
//       >
//         {({ setFieldValue, values }) => (
//           <Form>
//             <AntForm.Item label="First Name" labelCol={{ span: 24 }}>
//               <Field as={Input} name="first_name" placeholder="First name" />
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="first_name" />
//               </div>
//             </AntForm.Item>

//             <AntForm.Item label="Last Name" labelCol={{ span: 24 }}>
//               <Field as={Input} name="last_name" placeholder="Last name" />
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="last_name" />
//               </div>
//             </AntForm.Item>

//             <AntForm.Item label="Email" labelCol={{ span: 24 }}>
//               <Field as={Input} name="email" placeholder="Email address" />
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="email" />
//               </div>
//             </AntForm.Item>

//                         <AntForm.Item label="Phone" labelCol={{ span: 24 }}>
//               <Field name="phone">
//                 {({ field, form }: any) => (
//                   <MaskedInput
//                     {...field}
//                     value={field.value || ""}
//                     onChange={(e) =>
//                       form.setFieldValue("phone", e.target.value)
//                     }
//                     onBlur={field.onBlur}
//                     mask="+\9\9\8 (00) 000-00-00"
//                     />
//                 )}
//               </Field>
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="phone" />
//               </div>
//             </AntForm.Item>

//             {!isEdit && (
//               <>
//                 <AntForm.Item label="Password" labelCol={{ span: 24 }}>
//                   <Field
//                     as={Input.Password}
//                     name="password_hash"
//                     placeholder="Password"
//                   />
//                   <div style={{ color: "red" }}>
//                     <ErrorMessage name="password_hash" />
//                   </div>
//                 </AntForm.Item>

//                 <AntForm.Item label="Confirm Password" labelCol={{ span: 24 }}>
//                   <Field
//                     as={Input.Password}
//                     name="confirm_password"
//                     placeholder="Confirm your password"
//                   />
//                   <div style={{ color: "red" }}>
//                     <ErrorMessage name="confirm_password" />
//                   </div>
//                 </AntForm.Item>
//               </>
//             )}

//             <AntForm.Item label="Gender" labelCol={{ span: 24 }}>
//               <Field name="gender">
//                 {({ field }: any) => (
//                   <Select
//                     {...field}
//                     value={field.value}
//                     onChange={(value) => setFieldValue("gender", value)}
//                     style={{ width: "100%" }}
//                     placeholder="Select gender"
//                   >
//                     <Select.Option value="male">Male</Select.Option>
//                     <Select.Option value="female">Female</Select.Option>
//                   </Select>
//                 )}
//               </Field>
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="gender" />
//               </div>
//             </AntForm.Item>

//             <AntForm.Item label="Date of Birth" labelCol={{ span: 24 }}>
//               <DatePicker
//                 format="YYYY-MM-DD"
//                 value={
//                   values.date_of_birth ? dayjs(values.date_of_birth) : null
//                 }
//                 onChange={(_, dateString) =>
//                   setFieldValue("date_of_birth", dateString)
//                 }
//                 style={{ width: "100%" }}
//               />
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="date_of_birth" />
//               </div>
//             </AntForm.Item>

//             <AntForm.Item label="Lid ID" labelCol={{ span: 24 }}>
//               <Field name="lidId">
//                 {({ field }: any) => (
//                   <InputNumber
//                     {...field}
//                     value={values.lidId}
//                     onChange={(val) => setFieldValue("lidId", val)}
//                     style={{ width: "100%" }}
//                     min={0}
//                   />
//                 )}
//               </Field>
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="lidId" />
//               </div>
//             </AntForm.Item>

//             <Button type="primary" htmlType="submit" block>
//               {mode === "update" ? "update" : "create"}
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Modal>
//   );
// };

// export default StudentModal;






import React from "react";
import {
  Modal,
  Input,
  Form as AntForm,
  Button,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { MaskedInput } from "antd-mask-input";

export interface Student {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password_hash: string;
  confirm_password: string;
  gender: string;
  date_of_birth: string;
  lidId: number;
}

interface StudentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Student) => Promise<void>;
  editData?: Student;
  mode: "create" | "update";
  loading?: boolean;
}

const createValidationSchema = (isEdit: boolean) =>
  Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
    date_of_birth: Yup.string().required("Date of birth is required"),
    lidId: Yup.number().required("Lid ID is required"),
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

const StudentModal: React.FC<StudentModalProps> = ({
  visible,
  onClose,
  onSubmit,
  editData,
  mode,
  loading = false,
}) => {
  const isEdit = !!editData;

  const initialValues: Student = {
    first_name: editData?.first_name || "",
    last_name: editData?.last_name || "",
    email: editData?.email || "",
    phone: editData?.phone || "",
    password_hash: "",
    confirm_password: "",
    gender: editData?.gender || "",
    date_of_birth: editData?.date_of_birth || "",
    lidId: editData?.lidId || 0,
  };

  return (
    <Modal
      title={isEdit ? "Edit Student" : "Add Student"}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={createValidationSchema(isEdit)}
        onSubmit={(values) => {
          const { confirm_password, ...data } = values;
          return onSubmit(data as Student);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <AntForm.Item label="First Name" labelCol={{ span: 24 }}>
              <Field as={Input} name="first_name" placeholder="First name" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="first_name" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Last Name" labelCol={{ span: 24 }}>
              <Field as={Input} name="last_name" placeholder="Last name" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="last_name" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Email" labelCol={{ span: 24 }}>
              <Field as={Input} name="email" placeholder="Email address" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="email" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Phone" labelCol={{ span: 24 }}>
              <Field name="phone">
                {({ field, form }: any) => (
                  <MaskedInput
                    {...field}
                    value={field.value || ""}
                    onChange={(e) =>
                      form.setFieldValue("phone", e.target.value)
                    }
                    onBlur={field.onBlur}
                    mask="+\9\9\8 (00) 000-00-00"
                    />
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="phone" />
              </div>
            </AntForm.Item>

            {!isEdit && (
              <>
                <AntForm.Item label="Password" labelCol={{ span: 24 }}>
                  <Field
                    as={Input.Password}
                    name="password_hash"
                    placeholder="Password"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="password_hash" />
                  </div>
                </AntForm.Item>

                <AntForm.Item label="Confirm Password" labelCol={{ span: 24 }}>
                  <Field
                    as={Input.Password}
                    name="confirm_password"
                    placeholder="Confirm your password"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="confirm_password" />
                  </div>
                </AntForm.Item>
              </>
            )}

            <AntForm.Item label="Gender" labelCol={{ span: 24 }}>
              <Field name="gender">
                {({ field }: any) => (
                  <Select
                    {...field}
                    value={field.value}
                    onChange={(value) => setFieldValue("gender", value)}
                    style={{ width: "100%" }}
                    placeholder="Select gender"
                  >
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                  </Select>
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="gender" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Date of Birth" labelCol={{ span: 24 }}>
              <DatePicker
                format="YYYY-MM-DD"
                value={
                  values.date_of_birth ? dayjs(values.date_of_birth) : null
                }
                onChange={(_, dateString) =>
                  setFieldValue("date_of_birth", dateString)
                }
                style={{ width: "100%" }}
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="date_of_birth" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Lid ID" labelCol={{ span: 24 }}>
              <Field name="lidId">
                {({ field }: any) => (
                  <InputNumber
                    {...field}
                    value={values.lidId}
                    onChange={(val) => setFieldValue("lidId", val)}
                    style={{ width: "100%" }}
                    min={0}
                  />
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="lidId" />
              </div>
            </AntForm.Item>

            <Button type="primary" htmlType="submit" block loading={loading}>
              {mode === "update" ? "Update" : "Create"}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default StudentModal;