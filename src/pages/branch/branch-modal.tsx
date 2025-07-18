import React from "react";
import { Modal, Input, Form as AntForm, Button, Space } from "antd";
import { Formik, Form, Field } from "formik";
import { BranchValidation } from "@utils";
import type { Branch } from "@types";
import { MaskedInput } from "antd-mask-input";
import { useBranch } from "@hooks";

interface BranchModalProps {
  visible: boolean;
  onClose: () => void;
  editData?: Branch;
  mode: "create" | "update";
  loading?: boolean;
}

const BranchModal: React.FC<BranchModalProps> = ({
  visible,
  onClose,
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

  const { useBranchCreate, useBranchUpdate } = useBranch();
  const { mutate: createFn } = useBranchCreate();
  const { mutate: updateFn } = useBranchUpdate();

  const handleSubmit = (values: Branch) => {
    if (mode === "create") {
      const { id, ...createData } = values;
      createFn(createData as Omit<Branch, "id">, {
        onSuccess: () => {
          onClose();
        },
      });
    } else if (mode === "update" && editData) {
      const updateData = {
        name: values.name,
        address: values.address,
        call_number: values.call_number,
      };
      const id = editData.id!;
      updateFn(
        { model: updateData, id },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
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
        validationSchema={BranchValidation}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <AntForm.Item
              label="Branch Name"
              labelCol={{ span: 24 }}
              validateStatus={touched.name && errors.name ? "error" : ""}
              help={touched.name && errors.name}
            >
              <Field as={Input} name="name" placeholder="Enter branch name" />
            </AntForm.Item>

            <AntForm.Item
              label="Address"
              labelCol={{ span: 24 }}
              validateStatus={touched.address && errors.address ? "error" : ""}
              help={touched.address && errors.address}
            >
              <Field as={Input} name="address" placeholder="Enter address" />
            </AntForm.Item>

            <AntForm.Item
              label="Phone"
              labelCol={{ span: 24 }}
              validateStatus={
                touched.call_number && errors.call_number ? "error" : ""
              }
              help={touched.call_number && errors.call_number}
            >
              <Field name="call_number">
                {({ field }: any) => (
                  <MaskedInput
                    {...field}
                    mask="+\9\9\8 (00) 000-00-00"
                    placeholder="+998 (__) ___-__-__"
                  />
                )}
              </Field>
            </AntForm.Item>

            <Space
              style={{ width: "100%", marginTop: 16 }}
              direction="vertical"
            >
              <Button type="primary" htmlType="submit" block loading={loading}>
                {mode === "update" ? "Update" : "Create"}
              </Button>
            </Space>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default BranchModal;
