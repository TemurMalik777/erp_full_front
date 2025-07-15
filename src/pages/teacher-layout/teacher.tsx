// import { useEffect, useState } from "react";
// import { Button, Table, message } from "antd";
// import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
// import { BranchService, TeacherService } from "@service";
// import type { Branch, Teacher } from "@types";
// import TeacherModal from "./teacher-modal";
// import { PopConfirm } from "@components";
// function TeacherPage() {
//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [branches, setBranches] = useState<Branch[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editData, setEditData] = useState<Teacher | null>(null);
//   const [pagination, setPagination] = useState<TablePaginationConfig>({
//     current: 1,
//     pageSize: 10,
//   });

//   const fetchTeachers = async () => {
//     setLoading(true);
//     try {
//       const res = await TeacherService.getTeachers();
//       if (res?.data?.teachers) {
//         setTeachers(res.data.teachers);
//         setPagination((prev) => ({
//           ...prev,
//           current: 1,
//           pageSize: 10,
//           total: res.data.teachers.length,
//           showSizeChanger: true,
//           pageSizeOptions: ["3", "4", "5", "10"],
//         }));
//       }
//     } catch {
//       message.error("Failed to load teachers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBranch = async () => {
//     try {
//       const res = await BranchService.getBranches();
//       const branchesData = res?.data?.branch;

//       if (Array.isArray(branchesData)) {
//         const cleanedBranches = branchesData.map((branch: any) => ({
//           id: branch.id,
//           name: branch.name,
//           address: branch.address ?? "",
//           call_number: branch.call_number ?? "",
//         }));
//         setBranches(cleanedBranches);
//       } else {
//         setBranches([]);
//       }
//     } catch {
//       message.error("Failed to load branches");
//     }
//   };

//   useEffect(() => {
//     fetchTeachers();
//     fetchBranch();
//   }, []);

//   const handleSubmit = async (values: Teacher) => {
//     try {
//       if (editData?.id) {
//         await TeacherService.updateTeacher(values, editData.id);
//         message.success("Teacher updated successfully");
//       } else {
//         await TeacherService.createTeacher(values);
//         message.success("New teacher added successfully");
//       }
//       fetchTeachers();
//       setIsModalOpen(false);
//       setEditData(null);
//     } catch {
//       message.error("An error occurred while saving");
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm("Are you sure you want to delete this teacher?")) {
//       try {
//         await TeacherService.deleteTeacher(id);
//         message.success("Teacher deleted successfully");
//         fetchTeachers();
//       } catch {
//         message.error("An error occurred while deleting");
//       }
//     }
//   };

//   const columns: ColumnsType<Teacher> = [
//     { title: "First Name", dataIndex: "first_name", key: "first_name" },
//     { title: "Last Name", dataIndex: "last_name", key: "last_name" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Phone", dataIndex: "phone", key: "phone" },
//     { title: "Role", dataIndex: "role", key: "role" },
//     {
//       title: "Branches",
//       dataIndex: "branchId",
//       key: "branchId",
//       render: (branchId?: number[]) => {
//         if (!Array.isArray(branchId)) return "—";
//         const branchNames = branchId
//           // .map((id) => branches.find((branch) => branch.id === id)?.name)
//           .map((id) => branches.find((branch) => branch.id === id)?.name)

//           .filter(Boolean);
//         return branchNames.length > 0 ? branchNames.join(", ") : "—";
//       },
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
//         <h2>Teachers</h2>
//         <Button
//           type="primary"
//           onClick={() => {
//             setEditData(null);
//             setIsModalOpen(true);
//           }}
//         >
//           + Add Teacher
//         </Button>
//       </div>

//       <Table
//         dataSource={teachers}
//         columns={columns}
//         loading={loading}
//         rowKey={(record) => record.id!}
//         pagination={pagination}
//       />

//       <TeacherModal
//         visible={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditData(null);
//         }}
//         onSubmit={async (values) => {
//           if (editData) {
//             const { password, ...data } = values;
//             await handleSubmit(data as Teacher);
//           } else {
//             await handleSubmit(values); // password is required for creation
//           }
//         }}
//         branches={branches}
//         editData={editData ?? undefined}
//       />
//     </div>
//   );
// }

// export default TeacherPage;


import { useEffect, useState } from "react";
import { Button, Space, Table, type TablePaginationConfig } from "antd";
import type { Branch, Teacher } from "@types";
import TeacherModal from "./teacher-modal";
import { PopConfirm } from "@components";
import { useLocation } from "react-router-dom";
import { useGeneral, useTeachers, useBranch, useDeleteTeacher } from "@hooks";

function TeacherPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [editData, setEditData] = useState<Teacher | null>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
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

  const { data } = useTeachers();
  const { data: branchData } = useBranch();
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useDeleteTeacher();

  const branches = branchData?.data?.branch || [];

  const deleteItem = (id: number) => {
    deleteFn(id);
  };

  const editItem = (record: Teacher) => {
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
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Branches",
      dataIndex: "branchId",
      key: "branchId",
      render: (branchId?: number[]) => {
        if (!Array.isArray(branchId)) return "—";
        const branchNames = branchId
          .map((id) => branches.find((branch: Branch) => branch.id === id)?.name)
          .filter(Boolean);
        return branchNames.length > 0 ? branchNames.join(", ") : "—";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Teacher) => (
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
        <TeacherModal
          visible={isModalOpen}
          onClose={toggle}
          editData={editData ?? undefined}
          mode={mode}
          branches={branches}
          onSubmit={async (values) => {
            console.log(values);
            toggle();
          }}
        />
      )}
      <h1>Teachers</h1>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        + Add Teacher
      </Button>
      <Table<Teacher>
        columns={columns}
        dataSource={data?.data.teachers}
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

export default TeacherPage;