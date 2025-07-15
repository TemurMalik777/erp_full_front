import {
  Modal,
  Input,
  Form as AntForm,
  DatePicker,
  Select,
  Button,
} from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import type { Group } from "@types";
import { useCourse, useGroup } from "@hooks";

const { Option } = Select;

interface GroupModalProps {
  open: boolean;
  toggle: () => void;
  update: Group | null;
  mode: "create" | "update";
}

const GroupModal: React.FC<GroupModalProps> = ({
  open,
  toggle,
  update,
  mode,
}) => {
  const { useGroupCreate, useGroupUpdate } = useGroup({ page: 1, limit: 10 });
  const { mutate: createFn, isPending: isCreating } = useGroupCreate();
  const { mutate: updateFn, isPending: isUpdating } = useGroupUpdate();
  const { data } = useCourse();
  const courses = data?.data.courses || [];
  const isLoading = isCreating || isUpdating;

  const initialValues: Group = {
    name: update?.name || "",
    course_id: update?.course_id || 0,
    status: update?.status || "active",
    start_date: update?.start_date || "",
    end_date: update?.end_date || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Nomi majburiy"),
    course_id: Yup.number().required("Kurs ID majburiy"),
    status: Yup.string().required("Status majburiy"),
    start_date: Yup.string().required("Boshlanish sanasi kerak"),
    end_date: Yup.string().required("Tugash sanasi kerak"),
  });

  const handleSubmit = (values: Group) => {
    if (mode === "create") {
      createFn(values, { onSuccess: toggle });
    } else if (mode === "update" && update?.id) {
      updateFn({ model: values, id: update.id }, { onSuccess: toggle });
    }
  };

  return (
    <Modal
      open={open}
      title={mode === "create" ? "Yangi guruh qo'shish" : "Guruhni tahrirlash"}
      onCancel={toggle}
      footer={null}
      destroyOnHidden
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ setFieldValue, values }) => (
          <Form>
            <AntForm.Item label="Nomi">
              <Field name="name" as={Input} />
              <ErrorMessage
                name="name"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
            </AntForm.Item>

            <AntForm.Item label="Course" labelCol={{ span: 24 }}>
              <Select
                value={values.course_id || undefined}
                onChange={(value) => setFieldValue("course_id", value)}
                placeholder="Choose course"
                style={{ width: "100%" }}
              >
                {courses.map((course: any) => (
                  <Option key={course.id} value={course.id}>
                    {course.title}
                  </Option>
                ))}
              </Select>

              <ErrorMessage name="course_id" component="div" />
            </AntForm.Item>

            <AntForm.Item label="Holati">
              <Field name="status" as={Select} style={{ width: "100%" }}>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Field>
              <ErrorMessage
                name="status"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
            </AntForm.Item>

            <AntForm.Item label="Boshlanish sanasi">
              <DatePicker
                style={{ width: "100%" }}
                value={values.start_date ? dayjs(values.start_date) : null}
                onChange={(_, dateString) =>
                  setFieldValue("start_date", dateString)
                }
              />
              <ErrorMessage
                name="start_date"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
            </AntForm.Item>

            <AntForm.Item label="Tugash sanasi">
              <DatePicker
                style={{ width: "100%" }}
                value={values.end_date ? dayjs(values.end_date) : null}
                onChange={(_, dateString) =>
                  setFieldValue("end_date", dateString)
                }
              />
              <ErrorMessage
                name="end_date"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
            </AntForm.Item>

            <AntForm.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
              >
                {mode === "create" ? "Qo'shish" : "Saqlash"}
              </Button>
            </AntForm.Item>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default GroupModal;
