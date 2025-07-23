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
import { useCourse, useGroup } from "@hooks";
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
  const courses = data?.data.courses || [];
  const room = data?.data.roomes || [];

  const isLoading = isCreating || isUpdating;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Group>({
    defaultValues: {
      name: update?.name || "",
      course_id: update?.course_id || 0,
      status: update?.status || "active",
      start_date: update?.start_date || "",
      end_date: update?.end_date || "",
      start_time: update?.start_time || "",
      end_time: update?.end_time || "",
      roomId: update?.roomId || 0,
    },
    resolver: yupResolver(GroupValidation),
  });

  const onSubmit = (values: Group) => {
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
          validateStatus={errors.course_id && "error"}
          help={errors.course_id?.message}
        >
          <Controller
            name="course_id"
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
          label="End Date"
          validateStatus={errors.end_date && "error"}
          help={errors.end_date?.message}
        >
          <Controller
            name="end_date"
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
          label="End Time"
          validateStatus={errors.end_time && "error"}
          help={errors.end_time?.message}
        >
          <Controller
            name="end_time"
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
                {room.map((rooms: any) => (
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
