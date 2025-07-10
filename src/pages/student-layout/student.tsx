import { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { StudentService } from "../../service/student.service";
import StudentModal from "./student-model";
import type { Student } from "../../types/student";

function Student() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Student | null>(null);

  const fetchStudents = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const res = await StudentService.getStudents();
      if (res?.data?.students) {
        setStudents(res.data.students);
        setPagination({
          ...pagination,
          current: page,
          pageSize,
          total: res.data.students.length,
        });
      }
    } catch {
      message.error("An error occurred while loading students");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents(pagination.current!, pagination.pageSize!);
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    fetchStudents(pagination.current!, pagination.pageSize!);
  };

  const handleDelete = async (id: number) => {
    try {
      await StudentService.deleteStudent(id);
      message.success("Student deleted successfully");
      fetchStudents(pagination.current!, pagination.pageSize!);
    } catch {
      message.error("An error occurred while deleting");
    }
  };

  const handleSubmit = async (values: Student) => {
    try {
      if (editData?.id != null) {
        const res = await StudentService.updateStudent(values, editData.id);
        if (res?.status === 200) {
          message.success("Student updated successfully");
        }
      } else {
        const res = await StudentService.createStudent(values);
        if (res?.status === 201 || res?.status === 200) {
          message.success("Student created successfully");
        }
      }
      fetchStudents(pagination.current!, pagination.pageSize!);
      setIsModalOpen(false);
      setEditData(null);
    } catch {
      message.error("An error occurred while saving");
    }
  };

  const columns: ColumnsType<Student> = [
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Last Name", dataIndex: "last_name", key: "last_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Date of Birth", dataIndex: "date_of_birth", key: "date_of_birth" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            onClick={() => {
              setEditData(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this student?") &&
                record.id !== undefined
              ) {
                handleDelete(record.id);
              }
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2>Students</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          + Add Student
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={students}
        loading={loading}
        rowKey={(record) => record.id ?? record.email}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <StudentModal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSubmit={async (values) => {
          const { confirm_password, password_hash, ...studentData } = values;
          await handleSubmit(studentData as Student);
        }}
        editData={editData ?? undefined}
      />
    </div>
  );
}

export default Student;
