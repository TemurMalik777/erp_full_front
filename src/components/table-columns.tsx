import {
  type Branch,
  type Course,
  type Group,
  type Room,
  type Student,
  type Teacher,
} from "@types";
import { Tooltip, type TableProps } from "antd";

export const GroupColumns: TableProps<Group>["columns"] = [
  {
    title: "Group",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Course",
    dataIndex: "course",
    key: "course",
    render: (course: { title: string }) => <span>{course.title}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Start Date",
    dataIndex: "start_date",
    key: "start_date",
  },
  {
    title: "Start time",
    dataIndex: "start_time",
    key: "start_time",
  },
  {
    title: "Rooms",
    key: "roomId",
    render: (room: any) => <span>{room.name}</span>,
  },
];

export const CourseColumns = <T extends Course>(): TableProps<T>["columns"] => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Lessons per Week",
      dataIndex: "lessons_in_a_week",
      key: "lessons_in_a_week",
    },
    {
      title: "Lesson Duration",
      dataIndex: "lesson_duration",
      key: "lesson_duration",
    },
  ];
};

export const BranchColumns = <T extends Branch>(): TableProps<T>["columns"] => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "call_number",
      key: "call_number",
    },
  ];
};

export const StudentColumns: TableProps<Student>["columns"] = [
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Date of Birth",
    dataIndex: "date_of_birth",
    key: "date_of_birth",
  },
];
export const TeacherColumns: TableProps<Teacher>["columns"] = [
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Branch",
    key: "branchId",
    render: (record: any) => {
      const branches = record?.branches || [];

      if (branches.length === 0) return <span>—</span>;

      const firstBranch = branches[0]?.name;

      return (
        <Tooltip title={branches.map((b: any) => b.name).join(", ")}>
          <span style={{ cursor: "pointer" }}>{firstBranch}</span>
        </Tooltip>
      );
    },
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

export const RoomColumns: TableProps<Room>["columns"] = [
  {
    title: "Branch",
    key: "branchId",
    render: (record: any) => {
      let branches: any[] = [];

      if (Array.isArray(record?.branches)) {
        branches = record.branches;
      } else if (record?.branch && typeof record.branch === "object") {
        branches = [record.branch];
      }

      if (branches.length === 0) return <span>—</span>;

      const firstBranch = branches[0]?.name || "No name";

      return (
        <Tooltip title={branches.map((b: any) => b.name).join(", ")}>
          <span style={{ cursor: "pointer" }}>{firstBranch}</span>
        </Tooltip>
      );
    },
  },

  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
    key: "capacity",
  },
];
