// import { useEffect, useState } from "react";
// import { Button, Space, Table, type TablePaginationConfig } from "antd";
// import StudentModal from "./student-model";
// import type { Student } from "../../types/student";
// import { PopConfirm } from "@components";
// import { useLocation } from "react-router-dom";
// import { useGeneral, useStudent } from "@hooks";
// import { EditOutlined } from "@ant-design/icons";

// function Student() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [mode, setMode] = useState<"create" | "update">("create");
//   const [editData, setEditData] = useState<Student | null>(null);
//   const [params, setParams] = useState({
//     page: 1,
//     limit: 3,
//   });

//   const location = useLocation();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const page = searchParams.get("page");
//     const limit = searchParams.get("limit");
//     if (page && limit) {
//       setParams(() => ({
//         page: Number(page),
//         limit: Number(limit),
//       }));
//     }
//   }, [location.search]);

//   const { data, useStudentDelete } = useStudent();
//   const { handlePagination } = useGeneral();
//   const { mutate: deleteFn, isPending: isDeleting } = useStudentDelete();

//   const deleteItem = (id: number) => {
//     deleteFn(id);
//   };

//   const editItem = (record: Student) => {
//     setEditData(record);
//     setMode("update");
//     setIsModalOpen(true);
//   };

//   const toggle = () => {
//     setIsModalOpen(!isModalOpen);
//     if (editData) {
//       setEditData(null);
//     }
//   };

//   const handleTableChange = (pagination: TablePaginationConfig) => {
//     handlePagination({ pagination, setParams });
//   };

//   const columns = [
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
//       render: (_: any, record: Student) => (
//         <Space size="middle">
//           <Button type="primary" onClick={() => editItem(record)}>
//             <EditOutlined />
//           </Button>
//           <PopConfirm
//             onConfirm={() => deleteItem(record.id!)}
//             loading={isDeleting}
//           />
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <>
//       {isModalOpen && (
//         <StudentModal
//           visible={isModalOpen}
//           onClose={toggle}
//           editData={editData ?? undefined}
//           mode={mode}
//           onSubmit={async (values) => {
//             console.log(values);
//             toggle();
//           }}
//         />
//       )}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           marginBottom: "16px",
//           alignItems: "center",
//         }}
//       >
//         <h1>Students</h1>
//         <Button type="primary" onClick={() => {setIsModalOpen(true); setMode("create");}}>
//           + Add Student
//         </Button>
//       </div>
//       <Table<Student>
//         bordered
//         columns={columns}
//         dataSource={data?.data.students}
//         rowKey={(row) => row.id!}
//         pagination={{
//           current: params.page,
//           pageSize: params.limit,
//           total: data?.data.total,
//           showSizeChanger: true,
//           pageSizeOptions: ["3", "4", "5", "10"],
//         }}
//         onChange={handleTableChange}
//       />
//     </>
//   );
// }

// export default Student;

import { useEffect, useState } from "react";
import { Button, Space, Table, type TablePaginationConfig } from "antd";
import StudentModal from "./student-model";
import { PopConfirm } from "@components";
import { useLocation } from "react-router-dom";
import { useGeneral, useStudent } from "@hooks";
import { EditOutlined } from "@ant-design/icons";
import type { Student } from "@types";

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

  const { data, useStudentDelete, useStudentCreate, useStudentUpdate } =
    useStudent();
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useStudentDelete();
  const { mutate: createFn, isPending: isCreating } = useStudentCreate();
  const { mutate: updateFn, isPending: isUpdating } = useStudentUpdate();

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

  const handleSubmit = async (values: Student) => {
    const apiData = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone: values.phone,
      confirm_password: values.confirm_password,
      password_hash: values.password_hash,
      gender: values.gender,
      date_of_birth: values.date_of_birth,
      lidId: values.lidId,
      ...(mode === "create" && { password_hash: values.password_hash }),
    };

    if (mode === "create") {
      createFn(apiData, {
        onSuccess: toggle,
        onError: (error) => {
          console.error("Create error:", error);
        },
      });
    } else if (mode === "update" && editData?.id !== undefined) {
      updateFn(
        { model: apiData, id: editData.id },
        {
          onSuccess: toggle,
          onError: (error) => {
            console.error("Update error:", error);
          },
        }
      );
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
            <EditOutlined />
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
          onSubmit={handleSubmit}
          loading={isCreating || isUpdating}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
          alignItems: "center",
        }}
      >
        <h1>Students</h1>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setMode("create");
          }}
        >
          + Add Student
        </Button>
      </div>
      <Table<Student>
        bordered
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
