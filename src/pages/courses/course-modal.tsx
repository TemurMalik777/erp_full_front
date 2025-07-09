// import React from "react";
// import { Modal, Input, Form as AntForm, Button, Option  } from "antd";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import type { Course } from "@types";
// const { Option } = Select;

// interface CourseModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSubmit: (values: Course) => void;
//   editData?: Course;
// }

// const validationSchema = Yup.object({
//   title: Yup.string().required("Kurs nomi majburiy"),
//   description: Yup.string().required("Tavsif majburiy"),
//   price: Yup.number()
//     .typeError("Narx butun son bo‘lishi kerak")
//     .min(0, "Narx 0 dan kichik bo‘lmasligi kerak")
//     .integer("Narx butun son bo‘lishi kerak")
//     .required("Narx majburiy"),
//   duration: Yup.string().required("Davomiylik majburiy"),
//   lessons_in_a_week: Yup.number()
//     .typeError("Haftadagi darslar soni butun son bo‘lishi kerak")
//     .min(1, "Haftadagi darslar soni 1 dan kichik bo‘lmasligi kerak")
//     .integer("Haftadagi darslar soni butun son bo‘lishi kerak")
//     .required("Haftadagi darslar soni majburiy"),
//   lesson_duration: Yup.string().required("Dars davomiyligi majburiy"),
// });

// const CourseModal: React.FC<CourseModalProps> = ({
//   visible,
//   onClose,
//   onSubmit,
//   editData,
// }) => {
//   const initialValues: Course = editData || {
//     title: "",
//     description: "",
//     price: "",
//     duration: "",
//     lessons_in_a_week: "",
//     lesson_duration: "",
//   };

//   return (
//     <Modal
//       title={editData ? "Kursni tahrirlash" : "Kurs qo‘shish"}
//       open={visible}
//       onCancel={onClose}
//       footer={null}
//       destroyOnHidden
//     >
//       <Formik
//         enableReinitialize
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={onSubmit}
//       >
//         {() => (
//           <Form>
//             <AntForm.Item label="Kurs nomi">
//               <Field as={Input} name="title" placeholder="Kurs nomi" />
//               <ErrorMessage name="title">
//                 {(msg) => <div style={{ color: "red" }}>{msg}</div>}
//               </ErrorMessage>
//             </AntForm.Item>

//             <AntForm.Item label="Tavsif">
//               <Field
//                 as={Input.TextArea}
//                 name="description"
//                 placeholder="Kurs tavsifi"
//                 rows={4}
//               />
//               <ErrorMessage name="description">
//                 {(msg) => <div style={{ color: "red" }}>{msg}</div>}
//               </ErrorMessage>
//             </AntForm.Item>

//             <AntForm.Item label="Narxi">
//               <Field
//                 as={Input}
//                 type="number"
//                 name="price"
//                 placeholder="Kurs narxi"
//               />
//               <ErrorMessage name="price">
//                 {(msg) => <div style={{ color: "red" }}>{msg}</div>}
//               </ErrorMessage>
//             </AntForm.Item>

//             <AntForm.Item label="Davomiyligi">
//               <Field as="select" name="duration">
//                 <option value="">Davomiylikni tanlang</option>
//                 <option value="3 oy">3 oy</option>
//                 <option value="6 oy">6 oy</option>
//                 <option value="12 oy">12 oy</option>
//               </Field>
//               <ErrorMessage name="duration">
//                 {(msg) => <div style={{ color: "red" }}>{msg}</div>}
//               </ErrorMessage>
//             </AntForm.Item>

//             <AntForm.Item label="Haftadagi darslar soni">
//               <Field as="select" name="lessons_in_a_week">
//                 <option value="">Haftadagi darslar sonini tanlang</option>
//                 <option value="3">3</option>
//                 <option value="5">5</option>
//               </Field>
//               <ErrorMessage name="lessons_in_a_week">
//                 {(msg) => <div style={{ color: "red" }}>{msg}</div>}
//               </ErrorMessage>
//             </AntForm.Item>

//             <AntForm.Item label="Dars davomiyligi">
//               <Field as="select" name="lesson_duration">
//                 <option value="">Dars davomiyligini tanlang</option>
//                 <option value="2 soat">2 soat</option>
//                 <option value="4 soat">4 soat</option>
//               </Field>
//               <ErrorMessage name="lesson_duration">
//                 {(msg) => <div style={{ color: "red" }}>{msg}</div>}
//               </ErrorMessage>
//             </AntForm.Item>

//             <Button type="primary" htmlType="submit" block>
//               Saqlash
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Modal>
//   );
// };

// export default CourseModal;



import React from "react";
import { Modal, Input, Form as AntForm, Button, Select } from "antd";
import { Formik, Form, ErrorMessage, useFormikContext, Field } from "formik";
import * as Yup from "yup";
import type { Course } from "@types";

const { Option } = Select;

interface CourseModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Course) => void;
  editData?: Course;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Kurs nomi majburiy"),
  description: Yup.string().required("Tavsif majburiy"),
  price: Yup.number()
    .typeError("Narx butun son bo‘lishi kerak")
    .min(0, "Narx 0 dan kichik bo‘lmasligi kerak")
    .integer("Narx butun son bo‘lishi kerak")
    .required("Narx majburiy"),
  duration: Yup.string().required("Davomiylik majburiy"),
  lessons_in_a_week: Yup.number()
    .typeError("Haftadagi darslar soni butun son bo‘lishi kerak")
    .min(1, "Haftadagi darslar soni 1 dan kichik bo‘lmasligi kerak")
    .integer("Haftadagi darslar soni butun son bo‘lishi kerak")
    .required("Haftadagi darslar soni majburiy"),
  lesson_duration: Yup.string().required("Dars davomiyligi majburiy"),
});

// Antd Select uchun alohida komponent
const FormikSelect = ({
  label,
  name,
  options,
}: {
  label: string;
  name: keyof Course;
  options: { value: string | number; label: string }[];
}) => {
  const { setFieldValue, values } = useFormikContext<Course>();

  return (
    <AntForm.Item label={label}>
      <Select
        value={values[name] || undefined}
        onChange={(value) => setFieldValue(name, value)}
        placeholder={`${label}ni tanlang`}
        allowClear
      >
        {options.map((opt) => (
          <Option key={opt.value} value={opt.value}>
            {opt.label}
          </Option>
        ))}
      </Select>
      <ErrorMessage name={name}>
        {(msg) => <div style={{ color: "red", marginTop: 5 }}>{msg}</div>}
      </ErrorMessage>
    </AntForm.Item>
  );
};

const CourseModal: React.FC<CourseModalProps> = ({
  visible,
  onClose,
  onSubmit,
  editData,
}) => {
  const initialValues: Course = editData || {
    title: "",
    description: "",
    price: "",
    duration: "",
    lessons_in_a_week: "",
    lesson_duration: "",
  };

  return (
    <Modal
      title={editData ? "Kursni tahrirlash" : "Kurs qo‘shish"}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <AntForm.Item label="Kurs nomi">
              <Field as={Input} name="title" placeholder="Kurs nomi" />
              <ErrorMessage name="title">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            <AntForm.Item label="Tavsif">
              <Field
                as={Input.TextArea}
                name="description"
                placeholder="Kurs tavsifi"
                rows={4}
              />
              <ErrorMessage name="description">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            <AntForm.Item label="Narxi">
              <Field
                as={Input}
                type="number"
                name="price"
                placeholder="Kurs narxi"
              />
              <ErrorMessage name="price">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            <FormikSelect
              label="Davomiyligi"
              name="duration"
              options={[
                { value: "3 oy", label: "3 oy" },
                { value: "6 oy", label: "6 oy" },
                { value: "12 oy", label: "12 oy" },
              ]}
            />

            <FormikSelect
              label="Haftadagi darslar soni"
              name="lessons_in_a_week"
              options={[
                { value: 3, label: "3" },
                { value: 5, label: "5" },
              ]}
            />

            <FormikSelect
              label="Dars davomiyligi"
              name="lesson_duration"
              options={[
                { value: "2 soat", label: "2 soat" },
                { value: "4 soat", label: "4 soat" },
              ]}
            />

            <Button type="primary" htmlType="submit" block>
              Saqlash
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CourseModal;
