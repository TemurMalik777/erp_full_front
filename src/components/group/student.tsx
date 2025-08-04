// /comon/group/student.tsx

import { useState } from "react";
import {
  Collapse,
  Avatar,
  Tag,
  Space,
  Typography,
  Card,
  Button,
  Popconfirm,
} from "antd"; // 1. Popconfirm'ni import qilamiz
import {
  DeleteOutlined, // 1. DeleteOutlined icon'ni import qilamiz
} from "@ant-design/icons";
import AddStudentToGroupModal from "./student-add";
import { useStudent } from "@hooks";

// 2. KERAKLI TYPE'LARNI QO'SHAMIZ
import type { UseMutateFunction } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

interface DeleteStudentPayload {
  groupId: number;
  studentId: number; // Student ID type'i string edi, numberga o'zgartirdim. Agar string bo'lsa, moslang
}

const { Panel } = Collapse;
const { Text } = Typography;

interface Student {
  id: number; // ID odatda number bo'ladi, string bo'lsa, o'zgartiring
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

// 3. PROPS INTERFEYSINI YANGILAYMIZ
interface GroupStudentsProps {
  students: GroupStudent[];
  groupId: number;
  onDelete: UseMutateFunction<
    AxiosResponse<any, any> | undefined,
    Error,
    DeleteStudentPayload,
    unknown
  >;
  isDeleting: boolean;
}

// /comon/group/student.tsx faylidagi funksiyalar

const getStatusColor = (status: string): string => {
  const statusColors: { [key: string]: string } = {
    active: "green",
    inactive: "red",
    pending: "orange",
    graduated: "blue",
    suspended: "volcano",
    enrolled: "cyan",
  };
  // Agar "statusColors" obyektida kerakli status topilmasa,
  // "default" qiymati qaytariladi. Bu har doim string qaytishini ta'minlaydi.
  return statusColors[status?.toLowerCase()] || "default";
};

const getRoleColor = (role: string): string => {
  const roleColors: { [key: string]: string } = {
    student: "blue",
    monitor: "purple",
    leader: "gold",
    assistant: "green",
  };
  // Bu yerda ham agar "role" topilmasa, "default" qiymati qaytariladi.
  return roleColors[role?.toLowerCase()] || "default";
};

// 4. KOMPONENTGA YANGI PROPS'LARNI QO'SHAMIZ
const GroupStudents: React.FC<GroupStudentsProps> = ({
  students,
  groupId,
  onDelete,
  isDeleting,
}) => {
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
                  <Avatar /* ... */>{avatarText}</Avatar>

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
                        <Tag color={getStatusColor(student.status)}>
                          {/*...*/}
                        </Tag>
                      )}
                      {student.role && (
                        <Tag color={getRoleColor(student.role)}>{/*...*/}</Tag>
                      )}
                    </div>

                    <Text type="secondary" style={{ fontSize: "13px" }}>
                      {student.phone} • {student.email}
                    </Text>
                  </div>

                  {/* 5. O'CHIRISH TUGMASINI QO'SHAMIZ */}
                  <Popconfirm
                    title="Rostdan ham o'chirmoqchimisiz?"
                    onConfirm={() => {
                      // onDelete funksiyasini chaqiramiz
                      onDelete({ groupId, studentId: student.id });
                    }}
                    okText="Ha"
                    cancelText="Yo'q"
                    okButtonProps={{ loading: isDeleting }}
                  >
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={(e) => e.stopPropagation()} // Panel ochilib-yopilmasligi uchun
                    />
                  </Popconfirm>
                </div>
              }
              style={{
                marginBottom: "8px",
                backgroundColor: "#fafafa",
                border: "1px solid #f0f0f0",
                borderRadius: "8px",
              }}
            >
              {/* Panel content o'zgarishsiz qoladi */}
              <Card size="small">{/* ... */}</Card>
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
