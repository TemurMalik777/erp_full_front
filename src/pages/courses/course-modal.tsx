// import React from "react";
// import {
//   Modal,
//   Input,
//   Form as AntForm,
//   Button,
// } from "antd";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// export interface Course {
//   title: string;
//   description: string;
//   price: string;
//   duration: string;
//   lessons_in_a_week: string;
//   lesson_duration: string;
// }

// interface CourseModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSubmit: (values: Course) => void;
//   editData?: Course;
// }

// const validationSchema = Yup.object({
//   title: Yup.string().required("Kurs nomi majburiy"),
//   description: Yup.string().required("Tavsif majburiy"),
//   price: Yup.string().required("Narx majburiy"),
//   duration: Yup.string().required("Davomiylik majburiy"),
//   lessons_in_a_week: Yup.string().required("Haftadagi darslar soni majburiy"),
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
//                 {msg => <div style={{ color: "red" }}>{msg}</div>}
//               </ErrorMessage>
//             </AntForm.Item>

//             <AntForm.Item label="Tavsif">
//               <Field as={Input.TextArea} name="description" placeholder="Kurs tavsifi" rows={4} />
//               <ErrorMessage name="description">
//                 {msg => <div style={{ color: "red" }}>{msg}</div>}
//               </ErrorMessage>
//             </AntForm.Item>

//             <AntForm.Item label="Narxi">
//               <Field as={Input} name="price" placeholder="Kurs narxi" />
//               <ErrorMessage name="price">
//                 {msg => <div style={{ color: "red" }}>{msg}</div>}
//               </ErrorMessage>
//             </AntForm.Item>

//             <AntForm.Item label="Davomiyligi">
//               <Field as={Input} name="duration" placeholder="Kurs davomiyligi" />
//               <ErrorMessage name="duration">
//                 {msg => <div style={{ color: "red" }}>{msg}</div>}
//               </ErrorMessage>
//             </AntForm.Item>

//             <AntForm.Item label="Haftadagi darslar soni">
//               <Field as={Input} name="lessons_in_a_week" placeholder="Haftadagi darslar soni" />
//               <ErrorMessage name="lessons_in_a_week">
//                 {msg => <div style={{ color: "red" }}>{msg}</div>}
//               </ErrorMessage>
//             </AntForm.Item>

//             <AntForm.Item label="Dars davomiyligi">
//               <Field as={Input} name="lesson_duration" placeholder="Dars davomiyligi" />
//               <ErrorMessage name="lesson_duration">
//                 {msg => <div style={{ color: "red" }}>{msg}</div>}
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
import {
  Modal,
  Input,
  Form as AntForm,
  Button,
} from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export interface Course {
  title: string;
  description: string;
  price: number;
  duration: string;
  lessons_in_a_week: number;
  lesson_duration: string;
}

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

const CourseModal: React.FC<CourseModalProps> = ({
  visible,
  onClose,
  onSubmit,
  editData,
}) => {
  const initialValues: Course = editData || {
    title: "",
    description: "",
    price: 0,
    duration: "",
    lessons_in_a_week: 1,
    lesson_duration: "",
  };

  return (
    <Modal
      title={editData ? "Kursni tahrirlash" : "Kurs qo‘shish"}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
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
                {msg => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            <AntForm.Item label="Tavsif">
              <Field as={Input.TextArea} name="description" placeholder="Kurs tavsifi" rows={4} />
              <ErrorMessage name="description">
                {msg => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            <AntForm.Item label="Narxi">
              <Field as={Input} type="number" name="price" placeholder="Kurs narxi" />
              <ErrorMessage name="price">
                {msg => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            <AntForm.Item label="Davomiyligi">
              <Field as={Input} name="duration" placeholder="Kurs davomiyligi" />
              <ErrorMessage name="duration">
                {msg => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            <AntForm.Item label="Haftadagi darslar soni">
              <Field as={Input} type="number" name="lessons_in_a_week" placeholder="Haftadagi darslar soni" />
              <ErrorMessage name="lessons_in_a_week">
                {msg => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            <AntForm.Item label="Dars davomiyligi">
              <Field as={Input} name="lesson_duration" placeholder="Dars davomiyligi" />
              <ErrorMessage name="lesson_duration">
                {msg => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

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
1