import { useState } from "react";
import { Collapse, Avatar, Tag, Space, Typography, Card, Button } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import AddStudentToGroupModal from "./student-add";
import { useStudent } from "@hooks";

const { Panel } = Collapse;
const { Text } = Typography;

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  status?: string;
  role?: string;
}

interface GroupStudent {
  student: Student;
}

interface GroupStudentsProps {
  students: GroupStudent[];
  groupId: number;
}

const getStatusColor = (status: string): string => {
  const statusColors: { [key: string]: string } = {
    active: "green",
    inactive: "red",
    pending: "orange",
    graduated: "blue",
    suspended: "volcano",
    enrolled: "cyan",
  };
  return statusColors[status?.toLowerCase()] || "default";
};

const getRoleColor = (role: string): string => {
  const roleColors: { [key: string]: string } = {
    student: "blue",
    monitor: "purple",
    leader: "gold",
    assistant: "green",
  };
  return roleColors[role?.toLowerCase()] || "default";
};

const GroupStudents: React.FC<GroupStudentsProps> = ({ students, groupId }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useStudent({ page: 1, limit: 20 });
  const allStudents: Student[] = data?.data.data || [];

  const handleAddStudent = () => {
    setOpen(true);
  };

  return (
    <div className="m-1" style={{ maxWidth: "100%" }}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Students</h2>
        <Space>
          <Button type="primary" onClick={handleAddStudent}>
            + Add Student
          </Button>
        </Space>
      </div>

      <Collapse accordion size="large" ghost expandIconPosition="end">
        {students.map((item: GroupStudent) => {
          const student = item.student;
          const fullName = `${student.first_name} ${student.last_name}`;

          const avatarText = `${student.first_name?.[0] || ""}${
            student.last_name?.[0] || ""
          }`.toUpperCase();

          return (
            <Panel
              key={student.id}
              header={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    width: "100%",
                  }}
                >
                  <Avatar
                    size={48}
                    style={{
                      backgroundColor: "#1890ff",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                    icon={!avatarText ? <UserOutlined /> : null}
                  >
                    {avatarText}
                  </Avatar>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "4px",
                      }}
                    >
                      <Text
                        strong
                        style={{ fontSize: "16px", color: "#262626" }}
                      >
                        {fullName}
                      </Text>

                      {student.status && (
                        <Tag
                          color={getStatusColor(student.status)}
                          style={{ margin: 0 }}
                        >
                          {student.status.charAt(0).toUpperCase() +
                            student.status.slice(1)}
                        </Tag>
                      )}

                      {student.role && (
                        <Tag
                          color={getRoleColor(student.role)}
                          style={{ margin: 0 }}
                        >
                          <IdcardOutlined style={{ marginRight: "4px" }} />
                          {student.role.charAt(0).toUpperCase() +
                            student.role.slice(1)}
                        </Tag>
                      )}
                    </div>

                    <Text type="secondary" style={{ fontSize: "13px" }}>
                      {student.phone} • {student.email}
                    </Text>
                  </div>
                </div>
              }
              style={{
                marginBottom: "8px",
                backgroundColor: "#fafafa",
                border: "1px solid #f0f0f0",
                borderRadius: "8px",
              }}
            >
              <Card
                size="small"
                style={{
                  margin: "12px 0",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "16px",
                  }}
                >
                  <div>
                    <Text
                      strong
                      style={{
                        color: "#1890ff",
                        marginBottom: "8px",
                        display: "block",
                      }}
                    >
                      Shaxsiy Ma'lumotlar
                    </Text>
                    <Space
                      direction="vertical"
                      size="small"
                      style={{ width: "100%" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <UserOutlined
                          style={{ color: "#666", width: "16px" }}
                        />
                        <Text strong>Ism:</Text>
                        <Text>{fullName}</Text>
                      </div>

                      {student.status && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <div
                            style={{
                              width: "16px",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor:
                                  getStatusColor(student.status) === "green"
                                    ? "#52c41a"
                                    : getStatusColor(student.status) === "red"
                                    ? "#ff4d4f"
                                    : getStatusColor(student.status) ===
                                      "orange"
                                    ? "#fa8c16"
                                    : "#1890ff",
                              }}
                            />
                          </div>
                          <Text strong>Status:</Text>
                          <Tag color={getStatusColor(student.status)}>
                            {student.status.charAt(0).toUpperCase() +
                              student.status.slice(1)}
                          </Tag>
                        </div>
                      )}

                      {student.role && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <IdcardOutlined
                            style={{ color: "#666", width: "16px" }}
                          />
                          <Text strong>Rol:</Text>
                          <Tag color={getRoleColor(student.role)}>
                            {student.role.charAt(0).toUpperCase() +
                              student.role.slice(1)}
                          </Tag>
                        </div>
                      )}
                    </Space>
                  </div>

                  <div>
                    <Text
                      strong
                      style={{
                        color: "#1890ff",
                        marginBottom: "8px",
                        display: "block",
                      }}
                    >
                      Aloqa Ma'lumotlari
                    </Text>
                    <Space
                      direction="vertical"
                      size="small"
                      style={{ width: "100%" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <PhoneOutlined
                          style={{ color: "#666", width: "16px" }}
                        />
                        <Text strong>Telefon:</Text>
                        <Text copyable style={{ color: "#1890ff" }}>
                          {student.phone}
                        </Text>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <MailOutlined
                          style={{ color: "#666", width: "16px" }}
                        />
                        <Text strong>Email:</Text>
                        <Text copyable style={{ color: "#1890ff" }}>
                          {student.email}
                        </Text>
                      </div>
                    </Space>
                  </div>
                </div>
              </Card>
            </Panel>
          );
        })}
      </Collapse>

      <AddStudentToGroupModal
        open={open}
        onCancel={() => setOpen(false)}
        allStudents={allStudents}
        groupStudents={students}
        groupId={groupId}
      />
    </div>
  );
};

export default GroupStudents;
