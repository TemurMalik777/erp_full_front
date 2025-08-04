import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, Tooltip, type TablePaginationConfig } from "antd";
import BranchModal from "./branch-modal";
import type { Branch } from "@types";
import {  BranchColumns } from "@components";
import { useLocation } from "react-router-dom";
import { useGeneral, useBranch } from "@hooks";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
  // 1. Asosiy ustunlar saqlab qolindi
  ...(BranchColumns<BranchWithId>() ?? []),

  // 2. YANGI DIZAYNDAGI "ACTIONS" USTUNI
  {
    title: "Actions",
    key: "actions",
    render: (_: any, record: BranchWithId) => (
      <Space size="middle">
        {/* Tahrirlash (Update) ikonasi */}
        <Tooltip title="Tahrirlash">
          <Button
            type="text"
            shape="circle"
            icon={<EditOutlined style={{ fontSize: '18px', color: '#52c41a' }} />}
            onClick={() => editItem(record)} // Sizning editItem funksiyangiz
          />
        </Tooltip>

        {/* O'chirish (Delete) ikonasi */}
        <Popconfirm
          title="O'chirish"
          description="Haqiqatan ham o'chirmoqchimisiz?"
          onConfirm={() => deleteItem(record.id!)} // Sizning deleteItem funksiyangiz
          okText="Ha"
          cancelText="Yo'q"
          okButtonProps={{ loading: isDeleting }} // Sizning isDeleting o'zgaruvchingiz
        >
          <Tooltip title="O'chirish">
            <Button
              type="text"
              shape="circle"
              icon={<DeleteOutlined style={{ fontSize: '18px', color: '#faad14' }} />}
            />
          </Tooltip>
        </Popconfirm>
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
