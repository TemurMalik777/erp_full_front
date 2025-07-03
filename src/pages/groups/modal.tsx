import { Modal, Form, Input, DatePicker, Select } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import { GroupService } from "@service";
import type { Group } from "@types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialValues?: Group | null;
};

const { Option } = Select;

const GroupFormModal = ({ open, onClose, onSuccess, initialValues }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        start_date: dayjs(initialValues.start_date),
        end_date: dayjs(initialValues.end_date),
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const payload = {
      ...values,
      course_id: Number(values.course_id),
      start_date: values.start_date.format("YYYY-MM-DD"),
      end_date: values.end_date.format("YYYY-MM-DD"),
    };

    try {
      if (initialValues) {
        await GroupService.updateGroup(initialValues.id, payload);
      } else {
        await GroupService.createGroup(payload);
      }
      onSuccess();
      onClose();
      form.resetFields();
    } catch (err) {
      console.error("Saqlashda xatolik:", err);
    }
  };

  return (
    <Modal
      open={open}
      title={initialValues ? "Guruhni tahrirlash" : "Yangi guruh yaratish"}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Saqlash"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nomi"
          name="name"
          rules={[{ required: true, message: "Nomi majburiy" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select>
            <Option value="active">Active</Option>
            <Option value="padding">Padding</Option>
            <Option value="new">New</Option>
            <Option value="canceled">Canceled</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Kurs ID"
          name="course_id"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Boshlanish sanasi"
          name="start_date"
          rules={[{ required: true }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          label="Tugash sanasi"
          name="end_date"
          rules={[{ required: true }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GroupFormModal;
