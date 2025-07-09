import React from "react";
import { Modal, Input, Form as AntForm, Button, DatePicker } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import type { Student } from "@types";

interface StudentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Student) => Promise<void>;
  editData?: Student;
}

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password_hash: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  gender: Yup.string().required("Gender is required"),
  date_of_birth: Yup.string().required("Date of birth is required"),
  lidId: Yup.number().required("Lid ID is required"),
  eventsId: Yup.array()
    .of(Yup.number())
    .min(1, "At least one event ID is required"),
  groupsId: Yup.array()
    .of(Yup.number())
    .min(1, "At least one group ID is required"),
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
      title={editData ? "Edit Student" : "Add Student"}
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
        {({ setFieldValue, values }) => (
          <Form>
            <AntForm.Item label="First Name">
              <Field as={Input} name="first_name" placeholder="First Name" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="first_name" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Last Name">
              <Field as={Input} name="last_name" placeholder="Last Name" />
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

            <AntForm.Item label="Phone">
              <Field as={Input} name="phone" placeholder="Phone Number" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="phone" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Password">
              <Field
                as={Input.Password}
                name="password_hash"
                placeholder="Password"
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="password_hash" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Gender">
              <Field
                as={Input}
                name="gender"
                placeholder="Gender (e.g. male/female)"
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="gender" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Date of Birth">
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
                <ErrorMessage name="date_of_birth" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Lid ID">
              <Field
                as={Input}
                name="lidId"
                type="number"
                placeholder="Lid ID"
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="lidId" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Event IDs (comma-separated)">
              <Input
                value={
                  Array.isArray(values.eventsId)
                    ? values.eventsId.join(",")
                    : ""
                }
                onChange={(e) => {
                  const array = e.target.value
                    .split(",")
                    .map((id) => parseInt(id.trim()))
                    .filter((id) => !isNaN(id));
                  setFieldValue("eventsId", array);
                }}
                placeholder="e.g. 1,2,3"
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="eventsId" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Group IDs (comma-separated)">
              <Input
                value={
                  Array.isArray(values.groupsId)
                    ? values.groupsId.join(",")
                    : ""
                }
                onChange={(e) => {
                  const array = e.target.value
                    .split(",")
                    .map((id) => parseInt(id.trim()))
                    .filter((id) => !isNaN(id));
                  setFieldValue("groupsId", array);
                }}
                placeholder="e.g. 5,6"
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="groupsId" component="div" />
              </div>
            </AntForm.Item>

            <Button type="primary" htmlType="submit" block>
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default StudentModal;
