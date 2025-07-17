import React from "react";
import { Modal, Input, Form as AntForm, Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Branch } from "@types";
import { MaskedInput } from "antd-mask-input";

interface BranchModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: Branch) => void;
  editData?: Branch;
  mode: "create" | "update";
  loading?: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Branch name is required"),
  address: Yup.string().required("Address is required"),
  call_number: Yup.string().required("Phone number is required"),
});

const BranchModal: React.FC<BranchModalProps> = ({
  visible,
  onClose,
  onSubmit,
  editData,
  mode,
  loading = false,
}) => {
  const initialValues: Branch = editData || {
    id: 0,
    name: "",
    address: "",
    call_number: "",
  };

  return (
    <Modal
      title={editData ? "Edit Branch" : "Add Branch"}
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
            {/* Branch Name */}
            <AntForm.Item label="Branch Name" labelCol={{ span: 24 }}>
              <Field as={Input} name="name" placeholder="Enter branch name" />
              <ErrorMessage name="name">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            {/* Address */}
            <AntForm.Item label="Address" labelCol={{ span: 24 }}>
              <Field as={Input} name="address" placeholder="Enter address" />
              <ErrorMessage name="address">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
            </AntForm.Item>

            <AntForm.Item label="Phone" labelCol={{ span: 24 }}>
              <Field name="call_number">
                {({ field }: any) => (
                  <MaskedInput
                    {...field}
                    value={field.value || ""}
                    mask="+\9\9\8 (00) 000-00-00"
                  />
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage name="call_number" />
              </div>
            </AntForm.Item>

            {/* Submit Button */}
            <Button type="primary" htmlType="submit" block loading={loading}>
              {mode === "update" ? "Update" : "Create"}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default BranchModal;