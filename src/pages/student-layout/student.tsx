// import { useEffect, useState } from "react";
// import { Button, Table, message } from "antd";
// import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
// import { StudentService } from "../../service/student.service";
// import StudentModal from "./student-model";
// import type { Student } from "../../types/student";
// import { PopConfirm } from "@components";

// function Student() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState<TablePaginationConfig>({
//     current: 1,
//     pageSize: 3,
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editData, setEditData] = useState<Student | null>(null);

//   const fetchStudents = async (page: number, pageSize: number) => {
//     setLoading(true);
//     try {
//       const res = await StudentService.getStudents();
//       if (res?.data?.students) {
//         setStudents(res.data.students);
//         setPagination({
//           ...pagination,
//           current: page,
//           pageSize,
//           total: res.data.students.length,
//           showSizeChanger: true,
//           pageSizeOptions: ["3", "4", "5", "10"],
//         });
//       }
//     } catch {
//       message.error("An error occurred while loading students");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchStudents(pagination.current!, pagination.pageSize!);
//   }, []);

//   const handleTableChange = (pagination: TablePaginationConfig) => {
//     fetchStudents(pagination.current!, pagination.pageSize!);
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await StudentService.deleteStudent(id);
//       message.success("Student deleted successfully");
//       fetchStudents(pagination.current!, pagination.pageSize!);
//     } catch {
//       message.error("An error occurred while deleting");
//     }
//   };

//   const handleSubmit = async (values: Student) => {
//     try {
//       if (editData?.id != null) {
//         const res = await StudentService.updateStudent(values, editData.id);
//         if (res?.status === 200) {
//           message.success("Student updated successfully");
//         }
//       } else {
//         const res = await StudentService.createStudent(values);
//         if (res?.status === 201 || res?.status === 200) {
//           message.success("Student created successfully");
//         }
//       }
//       fetchStudents(pagination.current!, pagination.pageSize!);
//       setIsModalOpen(false);
//       setEditData(null);
//     } catch {
//       message.error("An error occurred while saving");
//     }
//   };

//   const columns: ColumnsType<Student> = [
//     { title: "First Name", dataIndex: "first_name", key: "first_name" },
//     { title: "Last Name", dataIndex: "last_name", key: "last_name" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Phone", dataIndex: "phone", key: "phone" },
//     { title: "Gender", dataIndex: "gender", key: "gender" },
//     {
//       title: "Date of Birth",
//       dataIndex: "date_of_birth",
//       key: "date_of_birth",
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <div style={{ display: "flex", gap: 8 }}>
//           <Button
//             onClick={() => {
//               setEditData(record);
//               setIsModalOpen(true);
//             }}
//           >
//             Edit
//           </Button>
//           <PopConfirm
//             onConfirm={() => record.id !== undefined && handleDelete(record.id)}
//           />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           marginBottom: 16,
//         }}
//       >
//         <h2>Students</h2>
//         <Button
//           type="primary"
//           onClick={() => {
//             setEditData(null);
//             setIsModalOpen(true);
//           }}
//         >
//           + Add Student
//         </Button>
//       </div>

//       <Table
//         columns={columns}
//         dataSource={students}
//         loading={loading}
//         rowKey={(record) => record.id ?? record.email}
//         pagination={pagination}
//         onChange={handleTableChange}
//       />

//       <StudentModal
//         visible={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditData(null);
//         }}
//         onSubmit={async (values) => {
//           const { confirm_password, password_hash, ...studentData } = values;
//           await handleSubmit(studentData as Student);
//         }}
//         editData={editData ?? undefined}
//       />
//     </div>
//   );
// }

// export default Student;


import { useEffect, useState } from "react";
import { Button, Space, Table, type TablePaginationConfig } from "antd";
import StudentModal from "./student-model";
import type { Student } from "../../types/student";
import { PopConfirm } from "@components";
import { useLocation } from "react-router-dom";
import { useGeneral, useStudent } from "@hooks";

function Student() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [editData, setEditData] = useState<Student | null>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 3,
  });
  
  const location = useLocation();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    if (page && limit) {
      setParams(() => ({
        page: Number(page),
        limit: Number(limit),
      }));
    }
  }, [location.search]);

  const { data, useStudentDelete } = useStudent();
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useStudentDelete();

  const deleteItem = (id: number) => {
    deleteFn(id);
  };

  const editItem = (record: Student) => {
    setEditData(record);
    setMode("update");
    setIsModalOpen(true);
  };

  const toggle = () => {
    setIsModalOpen(!isModalOpen);
    if (editData) {
      setEditData(null);
    }
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination({ pagination, setParams });
  };

  const columns = [
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Last Name", dataIndex: "last_name", key: "last_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "Date of Birth",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Student) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editItem(record)}>
            Edit
          </Button>
          <PopConfirm
            onConfirm={() => deleteItem(record.id!)}
            loading={isDeleting}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {isModalOpen && (
        <StudentModal
          visible={isModalOpen}
          onClose={toggle}
          editData={editData ?? undefined}
          mode={mode}
          onSubmit={async (values) => {
            console.log(values);
            toggle();
          }}
        />
      )}
      <h1>Students</h1>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        + Add Student
      </Button>
      <Table<Student>
        columns={columns}
        dataSource={data?.data.students}
        rowKey={(row) => row.id!}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.data.total,
          showSizeChanger: true,
          pageSizeOptions: ["3", "4", "5", "10"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
}

export default Student;