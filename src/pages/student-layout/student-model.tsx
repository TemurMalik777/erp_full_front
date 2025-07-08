// import React from "react";
// import {
//   Modal,
//   Input,
//   Form as AntForm,
//   Button,
//   DatePicker,
// } from "antd";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import dayjs from "dayjs";

// export interface Student {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   password_hash: string;
//   gender: string;
//   date_of_birth: string;
//   lidId: number;
//   eventsId: number;
//   groupsId: number;
// }

// interface StudentModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSubmit: (values: Student) => Promise<void>;
//   editData?: Student;
// }

// const validationSchema = Yup.object({
//   first_name: Yup.string().required("Ism majburiy"),
//   last_name: Yup.string().required("Familiya majburiy"),
//   email: Yup.string().email("Email noto‘g‘ri").required("Email majburiy"),
//   phone: Yup.string().required("Telefon majburiy"),
//   password_hash: Yup.string().required("Parol majburiy"),
//   gender: Yup.string().required("Jins majburiy"),
//   date_of_birth: Yup.string().required("Tug‘ilgan sana majburiy"),
//   lidId: Yup.number().required("Lid ID majburiy"),
//   eventsId: Yup.number().required("Voqea ID majburiy"),
//   groupsId: Yup.number().required("Guruh ID majburiy"),
// });

// const StudentModal: React.FC<StudentModalProps> = ({
//   visible,
//   onClose,
//   onSubmit,
//   editData,
// }) => {
//   const initialValues: Student = editData || {
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     password_hash: "",
//     gender: "",
//     date_of_birth: "",
//     lidId: 0,
//     eventsId: 0,
//     groupsId: 0,
//   };

//   return (
//     <Modal
//       title={editData ? "Talabani tahrirlash" : "Talaba qo‘shish"}
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
//         {({ setFieldValue, values }) => (
//           <Form>
//             <AntForm.Item label="Ism">
//               <Field as={Input} name="first_name" placeholder="Ism" />
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="first_name" component="div" />
//               </div>
//             </AntForm.Item>

//             <AntForm.Item label="Familiya">
//               <Field as={Input} name="last_name" placeholder="Familiya" />
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="last_name" component="div" />
//               </div>
//             </AntForm.Item>

//             <AntForm.Item label="Email">
//               <Field as={Input} name="email" placeholder="Email" />
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="email" component="div" />
//               </div>
//             </AntForm.Item>

//             <AntForm.Item label="Telefon">
//               <Field as={Input} name="phone" placeholder="Telefon raqami" />
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="phone" component="div" />
//               </div>
//             </AntForm.Item>

//             <AntForm.Item label="Parol">
//               <Field as={Input.Password} name="password_hash" placeholder="Parol" />
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="password_hash" component="div" />
//               </div>
//             </AntForm.Item>

//             <AntForm.Item label="Jinsi">
//               <Field as={Input} name="gender" placeholder="Jins (Masalan: erkak/ayol)" />
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="gender" component="div" />
//               </div>
//             </AntForm.Item>

//             <AntForm.Item label="Tug‘ilgan sana">
//               <DatePicker
//                 format="YYYY-MM-DD"
//                 value={values.date_of_birth ? dayjs(values.date_of_birth) : null}
//                 onChange={(_, dateString) => setFieldValue("date_of_birth", dateString)}
//                 style={{ width: "100%" }}
//               />
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="date_of_birth" component="div" />
//               </div>
//             </AntForm.Item>

//             <AntForm.Item label="Lid ID">
//               <Field as={Input} name="lidId" type="number" placeholder="Lid ID" />
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="lidId" component="div" />
//               </div>
//             </AntForm.Item>

//             <AntForm.Item label="Voqea ID">
//               <Field as={Input} name="eventsId" type="number" placeholder="Voqea ID" />
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="eventsId" component="div" />
//               </div>
//             </AntForm.Item>

//             <AntForm.Item label="Guruh ID">
//               <Field as={Input} name="groupsId" type="number" placeholder="Guruh ID" />
//               <div style={{ color: "red" }}>
//                 <ErrorMessage name="groupsId" component="div" />
//               </div>
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

// export default StudentModal;




import React from "react";
import {
  Modal,
  Input,
  Form as AntForm,
  Button,
  DatePicker,
} from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

export interface Student {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password_hash: string;
  gender: string;
  date_of_birth: string;
  lidId: number;
  eventsId: number[];
  groupsId: number[];
}

interface StudentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Student) => Promise<void>;
  editData?: Student;
}

const validationSchema = Yup.object({
  first_name: Yup.string().required("Ism majburiy"),
  last_name: Yup.string().required("Familiya majburiy"),
  email: Yup.string().email("Email manzili noto‘g‘ri formatda").required("Email majburiy"),
  phone: Yup.string().required("Telefon majburiy"),
  password_hash: Yup.string()
    .min(8, "Parol kamida 8 ta belgidan iborat bo‘lishi kerak")
    .required("Parol majburiy"),
  gender: Yup.string().required("Jins majburiy"),
  date_of_birth: Yup.string().required("Tug‘ilgan sana majburiy"),
  lidId: Yup.number().required("Lid ID majburiy"),
  eventsId: Yup.array().of(Yup.number()).min(1, "Kamida bitta voqea ID bo‘lishi kerak"),
  groupsId: Yup.array().of(Yup.number()).min(1, "Kamida bitta guruh ID bo‘lishi kerak"),
});

const StudentModal: React.FC<StudentModalProps> = ({
  visible,
  onClose,
  onSubmit,
  editData,
}) => {
  const initialValues: Student = editData || {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password_hash: "",
    gender: "",
    date_of_birth: "",
    lidId: 0,
    eventsId: [],
    groupsId: [],
  };

  return (
    <Modal
      title={editData ? "Talabani tahrirlash" : "Talaba qo‘shish"}
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
        {({ setFieldValue, values }) => (
          <Form>
            <AntForm.Item label="Ism">
              <Field as={Input} name="first_name" placeholder="Ism" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="first_name" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Familiya">
              <Field as={Input} name="last_name" placeholder="Familiya" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="last_name" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Email">
              <Field as={Input} name="email" placeholder="Email" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="email" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Telefon">
              <Field as={Input} name="phone" placeholder="Telefon raqami" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="phone" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Parol">
              <Field as={Input.Password} name="password_hash" placeholder="Parol" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="password_hash" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Jinsi">
              <Field as={Input} name="gender" placeholder="Jins (masalan: erkak/ayol)" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="gender" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Tug‘ilgan sana">
              <DatePicker
                format="YYYY-MM-DD"
                value={values.date_of_birth ? dayjs(values.date_of_birth) : null}
                onChange={(_, dateString) => setFieldValue("date_of_birth", dateString)}
                style={{ width: "100%" }}
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="date_of_birth" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Lid ID">
              <Field as={Input} name="lidId" type="number" placeholder="Lid ID" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="lidId" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Voqea ID (vergul bilan ajrating)">
              <Input
                value={values.eventsId.join(",")}
                onChange={(e) => {
                  const array = e.target.value
                    .split(",")
                    .map((id) => parseInt(id.trim()))
                    .filter((id) => !isNaN(id));
                  setFieldValue("eventsId", array);
                }}
                placeholder="Masalan: 1,2,3"
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="eventsId" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Guruh ID (vergul bilan ajrating)">
              <Input
                value={values.groupsId.join(",")}
                onChange={(e) => {
                  const array = e.target.value
                    .split(",")
                    .map((id) => parseInt(id.trim()))
                    .filter((id) => !isNaN(id));
                  setFieldValue("groupsId", array);
                }}
                placeholder="Masalan: 5,6"
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="groupsId" component="div" />
              </div>
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

export default StudentModal;
