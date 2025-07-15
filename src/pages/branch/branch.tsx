// import { BranchService } from "@service";
// import type { Branch } from "@types";
// import { Button, message, Table } from "antd";
// import type { ColumnType, TablePaginationConfig } from "antd/es/table";
// import { useEffect, useState } from "react";
// import BranchModal from "./branch-modal";
// import { PopConfirm } from "@components";

// interface BranchWithId extends Branch {
//   id: number;
// }

// const Branch = () => {
//   const [branch, setBranch] = useState<BranchWithId[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState<TablePaginationConfig>({
//     current: 1,
//     pageSize: 10,
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editData, setEditData] = useState<BranchWithId | null>(null);

//   const fetchBranch = async (page: number, pageSize: number) => {
//     setLoading(true);
//     try {
//       const res = await BranchService.getBranches();
//       if (res?.data?.branch) {
//         setBranch(res.data.branch);
//         setPagination({
//           ...pagination,
//           current: page,
//           pageSize,
//           total: res.data.branch.length,
//           showSizeChanger: true,
//           pageSizeOptions: ["3", "4", "5", "10"],
//         });
//       }
//     } catch (error) {
//       message.error("Error loading branches");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchBranch(pagination.current!, pagination.pageSize!);
//   }, []);

//   const handleTableChange = (pagination: TablePaginationConfig) => {
//     fetchBranch(pagination.current!, pagination.pageSize!);
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await BranchService.deleteBranch(id);
//       message.success("Branch deleted");
//       fetchBranch(pagination.current!, pagination.pageSize!);
//     } catch (error) {
//       message.error("Error deleting branch");
//     }
//   };

//   const handleSubmit = async (values: Branch) => {
//     const payload = {
//       id: values.id,
//       name: values.name,
//       address: values.address,
//       call_number: values.call_number,
//     };
//     try {
//       if (editData) {
//         const res = await BranchService.updateBranch(payload, editData.id);
//         if (res?.status === 200) {
//           message.success("Branch updated");
//         }
//       } else {
//         const res = await BranchService.createBranch(payload);
//         if (res?.status === 201 || res?.status === 200) {
//           message.success("Branch created");
//         }
//       }
//       fetchBranch(pagination.current!, pagination.pageSize!);
//       setIsModalOpen(false);
//       setEditData(null);
//     } catch (error) {
//       message.error("Error creating or updating branch");
//     }
//   };

//   const columns: ColumnType<BranchWithId>[] = [
//     { title: "Name", dataIndex: "name", key: "name" },
//     { title: "Address", dataIndex: "address", key: "address" },
//     { title: "Phone Number", dataIndex: "call_number", key: "call_number" },
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
//         <h2>Branches</h2>
//         <Button
//           type="primary"
//           onClick={() => {
//             setEditData(null);
//             setIsModalOpen(true);
//           }}
//         >
//           Add Branch
//         </Button>
//       </div>

//       <Table
//         columns={columns}
//         dataSource={branch}
//         loading={loading}
//         rowKey={(record) => record.id}
//         pagination={pagination}
//         onChange={handleTableChange}
//       />

//       <BranchModal
//         visible={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditData(null);
//         }}
//         onSubmit={handleSubmit}
//         editData={editData ?? undefined}
//       />
//     </div>
//   );
// };

// export default Branch;




import { useEffect, useState } from "react";
import { Button, Space, Table, type TablePaginationConfig } from "antd";
import BranchModal from "./branch-modal";
import type { Branch } from "@types";
import { PopConfirm } from "@components";
import { useLocation } from "react-router-dom";
import { useGeneral, useBranch } from "@hooks";

interface BranchWithId extends Branch {
  id: number;
}

const Branch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [editData, setEditData] = useState<BranchWithId | null>(null);
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

  const { data, useBranchDelete } = useBranch();
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useBranchDelete();

  const deleteItem = (id: number) => {
    deleteFn(id);
  };

  const editItem = (record: BranchWithId) => {
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
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Phone Number", dataIndex: "call_number", key: "call_number" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: BranchWithId) => (
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
        <BranchModal
          visible={isModalOpen}
          onClose={toggle}
          editData={editData ?? undefined}
          mode={mode} onSubmit={function (values: Branch): void {
            console.log(values);
            throw new Error("Function not implemented.");
          } }        />
      )}
      <h1>Branches</h1>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Branch
      </Button>
      <Table<BranchWithId>
        columns={columns}
        dataSource={data?.data.branch}
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
};

export default Branch;