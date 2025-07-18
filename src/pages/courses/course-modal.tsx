import React from "react";
import { Modal, Input, Form as AntForm, Button, Select } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { Course } from "@types";
import { useCourse } from "@hooks";
import { CourseValidation } from "@utils";
const { Option } = Select;

interface CourseModalProps {
  visible: boolean;
  onClose: () => void;
  editData?: Course;
  mode: "create" | "update";
}

const CourseModal: React.FC<CourseModalProps> = ({
  visible,
  onClose,
  editData,
  mode,
}) => {
  const { useCourseCreate, useCourseUpdate } = useCourse();
  const { mutate: createFn, isPending: isCreating } = useCourseCreate();
  const { mutate: updateFn, isPending: isUpdating } = useCourseUpdate();
  const isLoading = isCreating || isUpdating;

  const initialValues: Course = {
    title: editData?.title || "",
    description: editData?.description || "",
    price: editData?.price || "",
    duration: editData?.duration || "",
    lessons_in_a_week: editData?.lessons_in_a_week || "",
    lesson_duration: editData?.lesson_duration || "",
  };

  const handleSubmit = (values: Course) => {
    if (mode === "create") {
      const { id, ...payload } = values;
      createFn(payload as Omit<Course, "id">, { onSuccess: onClose });
    } else if (mode === "update" && editData?.id) {
      updateFn({ model: values, id: editData.id }, { onSuccess: onClose });
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      title={mode === "create" ? "Add Course" : "Edit Course"}
      footer={null}
      destroyOnHidden
    >
      <Formik
        initialValues={initialValues}
        validationSchema={CourseValidation}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form>
            <AntForm.Item label="Title" labelCol={{ span: 24 }}>
              <Field as={Input} name="title" placeholder="Enter course title" />
              <ErrorMessage
                name="title"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
            </AntForm.Item>

            <AntForm.Item label="Price" labelCol={{ span: 24 }}>
              <Field
                as={Input}
                name="price"
                type="number"
                placeholder="Enter price"
              />
              <ErrorMessage
                name="price"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
            </AntForm.Item>

            <AntForm.Item label="Duration" labelCol={{ span: 24 }}>
              <Select
                value={values.duration || undefined}
                onChange={(val) => setFieldValue("duration", val)}
                placeholder="Select duration"
                style={{ width: "100%" }}
              >
                <Option value="3 months">3 months</Option>
                <Option value="6 months">6 months</Option>
                <Option value="12 months">12 months</Option>
              </Select>
              <ErrorMessage
                name="duration"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
            </AntForm.Item>

            <AntForm.Item label="Lessons / Week" labelCol={{ span: 24 }}>
              <Select
                value={values.lessons_in_a_week || undefined}
                onChange={(val) => setFieldValue("lessons_in_a_week", val)}
                placeholder="Select lessons per week"
                style={{ width: "100%" }}
              >
                <Option value={3}>3</Option>
                <Option value={5}>5</Option>
              </Select>
              <ErrorMessage
                name="lessons_in_a_week"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
            </AntForm.Item>

            <AntForm.Item label="Lesson Duration" labelCol={{ span: 24 }}>
              <Select
                value={values.lesson_duration || undefined}
                onChange={(val) => setFieldValue("lesson_duration", val)}
                placeholder="Select lesson duration"
                style={{ width: "100%" }}
              >
                <Option value="2 hours">2 hours</Option>
                <Option value="4 hours">4 hours</Option>
              </Select>
              <ErrorMessage
                name="lesson_duration"
                render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
              />
            </AntForm.Item>

            <AntForm.Item label="Description" labelCol={{ span: 24 }}>
              <Field as={Input.TextArea} name="description" rows={4} />
              <ErrorMessage
                name="description"
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
                {mode === "update" ? "Update" : "Create"}
              </Button>
            </AntForm.Item>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CourseModal;
