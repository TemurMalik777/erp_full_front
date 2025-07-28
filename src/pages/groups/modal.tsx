import {
  Modal,
  Input,
  Form as AntForm,
  DatePicker,
  Select,
  Button,
  TimePicker,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import type { Group } from "@types";
import { useCourse, useGroup, useRoom } from "@hooks";
import { yupResolver } from "@hookform/resolvers/yup";
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
  const { data: dataRomm } = useRoom({ page: 1, limit: 100 });
  const courses = data?.data.courses || [];
  const rooms = dataRomm?.data.rooms || [];

  const isLoading = isCreating || isUpdating;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Group>({
    defaultValues: {
      name: update?.name || "",
      courseId: update?.course?.id || 0,
      status: update?.status || "active",
      start_date: update?.start_date || "",
      start_time: update?.start_time || "HH:mm",
      roomId: update?.roomId || 0,
    },
    resolver: yupResolver(GroupValidation) as any,
  });
  console.log("update:", update);

  const onSubmit = (values: Group) => {
    const payload = {
      ...values,
      courseId: Number(values.courseId),
      course: undefined,
    };

    console.log("Submitting payload:", payload);

    if (mode === "create") {
      createFn(payload, { onSuccess: toggle });
    } else if (mode === "update" && update?.id) {
        const model = {
      ...values,
      start_time: values.start_time
        ? dayjs(values.start_time, "HH:mm").format("HH:mm")
        : null
    };
      updateFn({ model: payload, id: update.id }, { onSuccess: toggle });
      console.log(model);
    }
  };
  return (
    <Modal
      open={open}
      title={mode === "create" ? "Add new group" : "Edit group"}
      onCancel={() => {
        reset();
        toggle();
      }}
      footer={null}
      destroyOnHidden
    >
      <AntForm layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <AntForm.Item
          label="Name"
          validateStatus={errors.name && "error"}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Name" />}
          />
        </AntForm.Item>
        <AntForm.Item
          label="Course"
          validateStatus={errors.courseId && "error"}
          help={errors.courseId?.message}
        >
          <Controller
            name="courseId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value || undefined}
                onChange={field.onChange}
                placeholder="Choose course"
              >
                {courses.map((course: any) => (
                  <Option key={course.id} value={course.id}>
                    {course.title}
                  </Option>
                ))}
              </Select>
            )}
          />
        </AntForm.Item>
        <AntForm.Item
          label="Status"
          validateStatus={errors.status && "error"}
          help={errors.status?.message}
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            )}
          />
        </AntForm.Item>
        <AntForm.Item
          label="Start Date"
          validateStatus={errors.start_date && "error"}
          help={errors.start_date?.message}
        >
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                style={{ width: "100%" }}
                value={field.value ? dayjs(field.value) : null}
                onChange={(_, dateString) => field.onChange(dateString)}
              />
            )}
          />
        </AntForm.Item>
        <AntForm.Item
          label="Start Time"
          validateStatus={errors.start_time && "error"}
          help={errors.start_time?.message}
        >
          <Controller
            name="start_time"
            control={control}
            render={({ field }) => (
              <TimePicker
                format="HH:mm"
                style={{ width: "100%" }}
                value={field.value ? dayjs(field.value, "HH:mm") : null}
                onChange={(value) => field.onChange(value?.format("HH:mm"))}
              />
            )}
          />
        </AntForm.Item>
        <AntForm.Item
          label="Rooms"
          validateStatus={errors.roomId && "error"}
          help={errors.roomId?.message}
        >
          <Controller
            name="roomId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value || undefined}
                onChange={field.onChange}
                placeholder="Choose rooms"
              >
                {rooms.map((rooms: any) => (
                  <Option key={rooms.id} value={rooms.id}>
                    {rooms.name}
                  </Option>
                ))}
              </Select>
            )}
          />
        </AntForm.Item>
        <AntForm.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            {mode === "update" ? "Update" : "Create"}
          </Button>
        </AntForm.Item>
      </AntForm>
    </Modal>
  );
};

export default GroupModal;
