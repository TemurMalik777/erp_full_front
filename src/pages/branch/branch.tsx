import { useEffect, useState } from "react";
import { Button, Space, Table, type TablePaginationConfig } from "antd";
import BranchModal from "./branch-modal";
import type { Branch } from "@types";
import { PopConfirm } from "@components";
import { useLocation } from "react-router-dom";
import { useGeneral, useBranch } from "@hooks";
import { EditOutlined } from "@ant-design/icons";

interface BranchWithId extends Branch {
  id: number;
}

const Branch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [editData, setEditData] = useState<BranchWithId | null>(null);
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

  const { data, useBranchDelete, useBranchCreate, useBranchUpdate } =
    useBranch();
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useBranchDelete();
  const { mutate: createFn, isPending: isCreating } = useBranchCreate();
  const { mutate: updateFn, isPending: isUpdating } = useBranchUpdate();

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

const handleSubmit = (values: Branch) => {
  if (mode === "create") {
    const { id, ...createData } = values;
    createFn(createData as Omit<Branch, 'id'>, {
      onSuccess: () => {
        toggle();
      },
    });
  } else if (mode === "update" && editData) {
     const updateData = {
        name: values.name,
        address: values.address,
        call_number: values.call_number,
      };
      updateFn({ model: updateData, id: editData.id }, {
        onSuccess: () => {
          toggle();
        },
      });
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
        <BranchModal
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
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h1>Branches</h1>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setMode("create");
          }}
        >
          + Add Branch
        </Button>
      </div>
      <Table<BranchWithId>
        bordered
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