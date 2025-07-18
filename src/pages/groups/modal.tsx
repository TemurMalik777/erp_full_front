import {
  Modal,
  Input,
  Form as AntForm,
  DatePicker,
  Select,
  Button,
} from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import dayjs from "dayjs";
import type { Group } from "@types";
import { useCourse, useGroup } from "@hooks";
import { GroupValidation } from "@utils";
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
      title={mode === "create" ? "Add new group" : "Edit group"}
      onCancel={toggle}
      footer={null}
      destroyOnHidden
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={GroupValidation}
        enableReinitialize
      >
        {({ setFieldValue, values }) => (
          <Form>
            <AntForm.Item label="Name" labelCol={{ span: 24 }}>
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

            <AntForm.Item label="Status" labelCol={{ span: 24 }}>
              <Field name="status" as={Select} style={{ width: "100%" }}>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Field>
              <ErrorMessage
                name="status"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
            </AntForm.Item>

            <AntForm.Item label="Start date" labelCol={{ span: 24 }}>
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

            <AntForm.Item label="End date" labelCol={{ span: 24 }}>
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
                {mode === "update" ? "update" : "create"}
              </Button>
            </AntForm.Item>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default GroupModal;
