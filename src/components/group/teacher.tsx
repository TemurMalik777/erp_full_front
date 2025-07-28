import { useState } from "react";
import {
  Avatar,
  Tag,
  Collapse,
  Badge,
  Button,
  Card,
  Space,
  Typography,
} from "antd";
import {
  UserOutlined,
  TeamOutlined,
  DownOutlined,
  RightOutlined,
  PlusOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useTeachers } from "@hooks";
import AddTeacherToGroupModal from "./teacher-add";
import type { CollapseProps } from "antd";

const { Text, Title } = Typography;

interface Teacher {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  role: string;
  status: string;
  email: string;
  phone: string;
  is_active: boolean;
}

interface GroupTeacher {
  teacher: Teacher;
  start_date: string;
  end_date: string;
}

interface GroupTeachersProps {
  teachers: GroupTeacher[];
  groupId: number;
}

const getStatusColor = (status: string): string => {
  const statusColors: { [key: string]: string } = {
    active: "green",
    inactive: "red",
    on_leave: "orange",
    retired: "blue",
    probation: "volcano",
    permanent: "cyan",
  };
  return statusColors[status] || "default";
};

const getRoleColor = (role: string): string => {
  const roleColors: { [key: string]: string } = {
    teacher: "blue",
    senior_teacher: "purple",
    head_teacher: "gold",
    assistant: "green",
    coordinator: "magenta",
    principal: "red",
  };
  return roleColors[role.toLowerCase()] || "default";
};

const GroupTeachers: React.FC<GroupTeachersProps> = ({ teachers, groupId }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data } = useTeachers({});
  const allTeachers: Teacher[] = data?.data.data || [];

  const activeTeachersCount = teachers.filter(
    (item: GroupTeacher) => item.teacher?.is_active
  ).length;

  const renderTeacherCard = (item: GroupTeacher) => {
    const { teacher, start_date, end_date } = item;
    const fullName = `${teacher.first_name} ${teacher.last_name}`;
    const avatar = teacher.avatar_url || "";
    const avatarText = `${teacher.first_name?.[0] || ""}${
      teacher.last_name?.[0] || ""
    }`.toUpperCase();

    return (
      <Card
        key={teacher.id}
        hoverable
        className="mb-4 shadow-md rounded-2xl"
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
        }}
        bodyStyle={{ padding: "24px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <Avatar
              size={80}
              src={avatar || undefined}
              style={{
                backgroundColor: avatar ? undefined : "#1890ff",
                fontSize: "28px",
                fontWeight: "bold",
                border: "4px solid #f0f2f5",
              }}
              icon={!avatar && !avatarText ? <UserOutlined /> : null}
            >
              {!avatar && avatarText}
            </Avatar>

            <div
              style={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: getStatusColor(teacher.status),
                border: "2px solid white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            />
          </div>

          <Title level={4} style={{ margin: "12px 0 8px 0", color: "#262626" }}>
            {fullName}
          </Title>

          <Space size="small" style={{ marginBottom: "16px" }}>
            {teacher.role && (
              <Tag
                color={getRoleColor(teacher.role)}
                style={{ borderRadius: "12px", padding: "2px 8px" }}
              >
                {teacher.role
                  .replace("_", " ")
                  .replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </Tag>
            )}
            {teacher.status && (
              <Tag
                color={getStatusColor(teacher.status)}
                style={{ borderRadius: "12px", padding: "2px 8px" }}
              >
                {teacher.status
                  .replace("_", " ")
                  .replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </Tag>
            )}
          </Space>
        </div>

        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CalendarOutlined
              style={{ color: "#1890ff", fontSize: "14px", width: "16px" }}
            />
            <Text strong style={{ color: "#595959", fontSize: "13px" }}>
              Time to work:
            </Text>
          </div>
          <div style={{ marginLeft: "24px", marginTop: "-8px" }}>
            <Text style={{ fontSize: "13px", color: "#262626" }}>
              {start_date} - {end_date}
            </Text>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MailOutlined
              style={{ color: "#1890ff", fontSize: "14px", width: "16px" }}
            />
            <Text strong style={{ color: "#595959", fontSize: "13px" }}>
              Email:
            </Text>
          </div>
          <div style={{ marginLeft: "24px", marginTop: "-8px" }}>
            <Text copyable style={{ fontSize: "13px", color: "#1890ff" }}>
              {teacher.email}
            </Text>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <PhoneOutlined
              style={{ color: "#1890ff", fontSize: "14px", width: "16px" }}
            />
            <Text strong style={{ color: "#595959", fontSize: "13px" }}>
              Phone:
            </Text>
          </div>
          <div style={{ marginLeft: "24px", marginTop: "-8px" }}>
            <Text copyable style={{ fontSize: "13px", color: "#1890ff" }}>
              {teacher.phone}
            </Text>
          </div>
        </Space>

        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#fafafa",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Teacher ID: {teacher.id}
          </Text>
        </div>
      </Card>
    );
  };

  const customExpandIcon: CollapseProps["expandIcon"] = ({ isActive }) => (
    <div className="flex items-center gap-2">
      {isActive ? <DownOutlined /> : <RightOutlined />}
    </div>
  );

  const items: CollapseProps["items"] = [
    {
      key: "teachers",
      label: (
        <div className="flex items-center justify-between w-full pr-4">
          <div className="flex items-center gap-3">
            <TeamOutlined className="text-blue-500" />
            <span className="font-semibold text-gray-700">Teachers</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              count={activeTeachersCount}
              style={{ backgroundColor: "#52c41a" }}
            />
            <span className="text-sm text-gray-500">
              Total: {teachers.length}
            </span>
          </div>
        </div>
      ),
      children: (
        <div className="space-y-3 mt-2">
          {teachers.length > 0 ? (
            teachers.map((item: GroupTeacher) => renderTeacherCard(item))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <TeamOutlined className="text-4xl mb-2" />
              <p>No teachers found</p>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setModalOpen(true)}
                className="mt-4"
              >
                + Add Teacher
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full p-4">
      <div className="flex justify-end mb-3">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalOpen(true)}
        >
          Add Teacher
        </Button>
      </div>

      <Collapse
        ghost
        expandIcon={customExpandIcon}
        className="bg-white rounded-lg shadow-sm"
        items={items}
        defaultActiveKey={[]}
      />

      <AddTeacherToGroupModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        groupTeachers={teachers}
        allTeachers={allTeachers}
        groupId={groupId}
      />
    </div>
  );
};

export default GroupTeachers;
