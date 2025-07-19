import React from "react";
import { Modal, Input, Form as AntForm, Button, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import type { Course } from "@types";
import { useCourse } from "@hooks";
import { yupResolver } from "@hookform/resolvers/yup";
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Course>({
    resolver: yupResolver(CourseValidation),
    defaultValues: {
      title: editData?.title || "",
      description: editData?.description || "",
      // price: editData?.price || "",
      price: editData ? editData.price : undefined,
      duration: editData?.duration || "",
      lessons_in_a_week: editData ? editData.lessons_in_a_week : undefined,
      lesson_duration: editData?.lesson_duration || "",
    },
  });

  const onSubmit = (values: Course) => {
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
      <AntForm layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <AntForm.Item label="Title">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input {...field} placeholder="Enter course title" />
            )}
          />
          {errors.title && (
            <div style={{ color: "red" }}>{errors.title.message}</div>
          )}
        </AntForm.Item>

        <AntForm.Item label="Price">
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <Input {...field} type="number" placeholder="Enter price" />
            )}
          />
          {errors.price && (
            <div style={{ color: "red" }}>{errors.price.message}</div>
          )}
        </AntForm.Item>

        <AntForm.Item label="Duration">
          <Controller
            control={control}
            name="duration"
            render={({ field }) => (
              <Select {...field} placeholder="Select duration">
                <Option value="3 months">3 months</Option>
                <Option value="6 months">6 months</Option>
                <Option value="12 months">12 months</Option>
              </Select>
            )}
          />
          {errors.duration && (
            <div style={{ color: "red" }}>{errors.duration.message}</div>
          )}
        </AntForm.Item>

        <AntForm.Item label="Lessons / Week">
          <Controller
            control={control}
            name="lessons_in_a_week"
            render={({ field }) => (
              <Select {...field} placeholder="Select lessons per week">
                <Option value={3}>3</Option>
                <Option value={5}>5</Option>
              </Select>
            )}
          />
          {errors.lessons_in_a_week && (
            <div style={{ color: "red" }}>
              {errors.lessons_in_a_week.message}
            </div>
          )}
        </AntForm.Item>

        <AntForm.Item label="Lesson Duration">
          <Controller
            control={control}
            name="lesson_duration"
            render={({ field }) => (
              <Select {...field} placeholder="Select lesson duration">
                <Option value="2 hours">2 hours</Option>
                <Option value="4 hours">4 hours</Option>
              </Select>
            )}
          />
          {errors.lesson_duration && (
            <div style={{ color: "red" }}>{errors.lesson_duration.message}</div>
          )}
        </AntForm.Item>

        <AntForm.Item label="Description">
          <Controller
            control={control}
            name="description"
            render={({ field }) => <Input.TextArea {...field} rows={4} />}
          />
          {errors.description && (
            <div style={{ color: "red" }}>{errors.description.message}</div>
          )}
        </AntForm.Item>

        <AntForm.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            {mode === "update" ? "Update" : "Create"}
          </Button>
        </AntForm.Item>
      </AntForm>
    </Modal>
  );
};

export default CourseModal;
