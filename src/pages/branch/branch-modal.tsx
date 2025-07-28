import React, { useEffect } from "react";
import { Modal, Input, Form as AntForm, Button, Space } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  const { useBranchCreate, useBranchUpdate } = useBranch();
  const { mutate: createFn } = useBranchCreate();
  const { mutate: updateFn } = useBranchUpdate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Branch>({
    resolver: yupResolver(BranchValidation),
    defaultValues: {
      id: 0,
      name: "",
      address: "",
      call_number: "",
    },
  });

  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset({
        id: 0,
        name: "",
        address: "",
        call_number: "",
      });
    }
  }, [editData, reset]);

  const onSubmit = (values: Branch) => {
    if (mode === "create") {
      const { id, ...createData } = values;
      createFn(createData as Omit<Branch, "id">, {
        onSuccess: onClose,
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
          onSuccess: onClose,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <AntForm.Item
          label="Branch Name"
          labelCol={{ span: 24 }}
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input {...field} placeholder="Enter branch name" />
            )}
          />
        </AntForm.Item>

        <AntForm.Item
          label="Address"
          labelCol={{ span: 24 }}
          validateStatus={errors.address ? "error" : ""}
          help={errors.address?.message}
        >
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <Input {...field} placeholder="Enter address" />
            )}
          />
        </AntForm.Item>

        {/* <AntForm.Item
          label="Phone"
          labelCol={{ span: 24 }}
          validateStatus={errors.call_number ? "error" : ""}
          help={errors.call_number?.message}
        >
          <Controller
            control={control}
            name="call_number"
            render={({ field }) => (
              <MaskedInput
                {...field}
                mask="+\9\9\8 (00) 000-00-00"
                placeholder="+998 (__) ___-__-__"
              />
            )}
          />

        </AntForm.Item> */}

        <AntForm.Item
          label="Phone"
          labelCol={{ span: 24 }}
          validateStatus={errors.call_number ? "error" : ""}
          help={errors.call_number?.message}
        >
          <Controller
            name="call_number"
            control={control}
            render={({ field }) => (
              <MaskedInput
                {...field}
                mask="+\9\9\8 (00) 000-00-00"
                placeholder="Enter phone number"
              />
            )}
          />
        </AntForm.Item>

        <Space style={{ width: "100%", marginTop: 16 }} direction="vertical">
          <Button type="primary" htmlType="submit" block loading={loading}>
            {mode === "update" ? "Update" : "Create"}
          </Button>
        </Space>
      </form>
    </Modal>
  );
};

export default BranchModal;