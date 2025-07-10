import React from "react";
import {
  Modal,
  Input,
  Form as AntForm,
  Button,
  DatePicker,
  Select,
} from "antd";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import type { Student } from "@types";
const { Option } = Select;

interface StudentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Student) => Promise<void>;
  editData?: Student;
}
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
    confirm_password: "",
    gender: "",
    date_of_birth: "",
    lidId: 0,
    // eventsId: [],
    // groupsId: [],
  };
const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  // password_hash: Yup.string()
  //   .min(8, "Password must be at least 8 characters")
  //   .required("Password is required"),
  // confirm_password: Yup.string()
  //   .oneOf([Yup.ref("password_hash")], "Passwords must match")
  //   .required("Confirm password is required"),
  ...(!editData && {
    password_hash: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password_hash")], "Passwords must match")
      .required("Confirm password is required"),
  }),
  gender: Yup.string()
    .oneOf(["male", "female"], "Please select a valid gender")
    .required("Gender is required"),
  date_of_birth: Yup.string().required("Date of birth is required"),
  lidId: Yup.number().required("Lid ID is required"),
  eventsId: Yup.array()
    .of(Yup.number())
    .min(1, "At least one event ID is required"),
  groupsId: Yup.array()
    .of(Yup.number())
    .min(1, "At least one group ID is required"),
});


  const FormikSelect = ({
    label,
    name,
    options,
  }: {
    label: string;
    name: keyof Student;
    options: { value: string; label: string }[];
  }) => {
    const { setFieldValue, values } = useFormikContext<Student>();

    return (
      <AntForm.Item label={label} labelCol={{ span: 24 }}>
        <Select
          value={values[name] || undefined}
          onChange={(value) => setFieldValue(name, value)}
          placeholder={`Select ${label.toLowerCase()}`}
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
            <AntForm.Item label="First Name" labelCol={{ span: 24 }}>
              <Field as={Input} name="first_name" placeholder="First Name" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="first_name" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Last Name" labelCol={{ span: 24 }}>
              <Field as={Input} name="last_name" placeholder="Last Name" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="last_name" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Email" labelCol={{ span: 24 }}>
              <Field as={Input} name="email" placeholder="Email" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="email" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Phone" labelCol={{ span: 24 }}>
              <Field as={Input} name="phone" placeholder="Phone Number" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="phone" component="div" />
              </div>
            </AntForm.Item>

            {/* <AntForm.Item label="Password" labelCol={{ span: 24 }}>
              <Field
                as={Input.Password}
                name="password_hash"
                placeholder="Password"
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="password_hash" component="div" />
              </div>
            </AntForm.Item>

            <AntForm.Item label="Confirm Password" labelCol={{ span: 24 }}>
              <Field
                as={Input.Password}
                name="confirm_password"
                placeholder="Confirm Password"
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="confirm_password" component="div" />
              </div>
            </AntForm.Item> */}

            {!editData && (
              <>
                <AntForm.Item label="Password" labelCol={{ span: 24 }}>
                  <Field
                    as={Input.Password}
                    name="password_hash"
                    placeholder="Password"
                    visibilityToggle={false}
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="password_hash" component="div" />
                  </div>
                </AntForm.Item>

                <AntForm.Item label="Confirm Password" labelCol={{ span: 24 }}>
                  <Field
                    as={Input.Password}
                    name="confirm_password"
                    placeholder="Confirm Password"
                    visibilityToggle={false}
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="confirm_password" component="div" />
                  </div>
                </AntForm.Item>
              </>
            )}

            <FormikSelect
              label="Gender"
              name="gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />

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
                <ErrorMessage name="date_of_birth" component="div" />
              </div>
            </AntForm.Item>

            {/* <AntForm.Item label="Lid ID">
              <Field
                as={Input}
                name="lidId"
                type="number"
                placeholder="Lid ID"
              />
              <div style={{ color: "red" }}>
                <ErrorMessage name="lidId" component="div" />
              </div>
            </AntForm.Item> */}

            {/* <AntForm.Item label="Event IDs (comma-separated)">
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
            </AntForm.Item> */}

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
