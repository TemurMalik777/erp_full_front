import { useState } from "react";
import { Button, Card, Avatar, Tag, Typography, Row, Col, Empty } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import { useTeachers } from "@hooks";
import AddTeacherToGroupModal from "./teacher-add";

const { Title, Text } = Typography;

interface Teacher {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  role: string;
  is_active: boolean;
  email: string;
  phone: string;
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

const GroupTeachers: React.FC<GroupTeachersProps> = ({ teachers, groupId }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data } = useTeachers({});
  const allTeachers: Teacher[] = data?.data.data || [];

  const activeTeachersCount = teachers.filter(
    (item) => item.teacher?.is_active
  ).length;

  const mainTeachersCount = teachers.filter((item) =>
    ["main teacher"].includes(item.teacher?.role.toLowerCase())
  ).length;

  const assistantTeachersCount = teachers.filter(
    (item) => item.teacher?.role.toLowerCase() === "assistant teacher"
  ).length;

  const getRoleColor = (role: string) => {
    const lowerRole = role.toLowerCase();
    if (["main teacher"].includes(lowerRole)) {
      return "blue";
    }
    if (lowerRole === "assistant teacher") {
      return "orange";
    }
    return "default";
  };

  const renderTeacherCard = (item: GroupTeacher) => {
    const { teacher } = item;
    const fullName = `${teacher.first_name} ${teacher.last_name}`;
    const avatarText = `${teacher.first_name?.[0] || ""}${
      teacher.last_name?.[0] || ""
    }`.toUpperCase();

    return (
      <Card
        key={teacher.id}
        hoverable
        style={{
          marginBottom: 16,
          borderRadius: 12,
          border: "1px solid #f0f0f0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          transition: "all 0.3s ease",
        }}
        bodyStyle={{ padding: 20 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <Avatar
                src={teacher.avatar_url}
                icon={<UserOutlined />}
                size={50}
                style={{
                  backgroundColor: teacher.is_active ? "#1890ff" : "#d9d9d9",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {!teacher.avatar_url && avatarText}
              </Avatar>
              <div
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: teacher.is_active ? "#52c41a" : "#d9d9d9",
                  border: "2px solid white",
                  boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 6 }}>
                <Text strong style={{ fontSize: 18, color: "#262626" }}>
                  {fullName}
                </Text>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 6,
                }}
              >
                <Tag
                  color={getRoleColor(teacher.role)}
                  style={{
                    borderRadius: 16,
                    paddingInline: 12,
                    paddingBlock: 4,
                    fontSize: 12,
                    fontWeight: 500,
                    border: "none",
                  }}
                >
                  {teacher.role}
                </Tag>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    <span style={{ fontWeight: 500 }}>ID:</span> {teacher.id}
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <Tag
              color={teacher.is_active ? "success" : "default"}
              style={{
                borderRadius: 20,
                paddingInline: 12,
                paddingBlock: 6,
                fontSize: 12,
                fontWeight: 500,
                border: teacher.is_active
                  ? "1px solid #b7eb8f"
                  : "1px solid #d9d9d9",
                backgroundColor: teacher.is_active ? "#f6ffed" : "#fafafa",
              }}
            >
              {teacher.is_active ? "● Active" : "○ Inactive"}
            </Tag>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          {groupId} Group Teachers
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalOpen(true)}
        >
          Add Teacher
        </Button>
      </div>

      <Row gutter={16} style={{ marginBottom: 32 }}>
        {[
          {
            value: teachers.length,
            title: "Total Teachers",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          },
          {
            value: activeTeachersCount,
            title: "Active",
            gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
            color: "white",
          },
          {
            value: teachers.length - activeTeachersCount,
            title: "Inactive",
            gradient: "linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)",
            color: "white",
          },
          {
            value: mainTeachersCount,
            title: "Main Teachers",
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            color: "white",
          },
          {
            value: assistantTeachersCount,
            title: "Assistant Teachers",
            gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            color: "#2c3e50",
          },
        ].map((stat, index) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={4}
            xl={4}
            key={index}
            style={{ marginBottom: 16 }}
          >
            <Card
              style={{
                textAlign: "center",
                borderRadius: 12,
                background: stat.gradient,
                border: "none",
                color: stat.color,
                height: 120,
              }}
              bodyStyle={{
                padding: "20px 16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div
                style={{ fontSize: 28, fontWeight: "bold", marginBottom: 4 }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 14,
                  opacity: stat.color === "white" ? 0.9 : 0.8,
                }}
              >
                {stat.title}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div>
        {teachers.length > 0 ? (
          <div>{teachers.map((item) => renderTeacherCard(item))}</div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No teachers assigned to this group"
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalOpen(true)}
            >
              Add First Teacher
            </Button>
          </Empty>
        )}
      </div>

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
