import { useEffect, useState } from "react";
import { Button, Space, Table, type TablePaginationConfig } from "antd";
import type { Teacher } from "@types";
import TeacherModal from "./teacher-modal";
import { PopConfirm } from "@components";
import { useLocation } from "react-router-dom";
import { useGeneral, useTeachers, useDeleteTeacher } from "@hooks";
import { EditOutlined } from "@ant-design/icons";

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
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useDeleteTeacher();

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
      title: "Actions",
      key: "actions",
      render: (_: any, record: Teacher) => (
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
        <TeacherModal
          visible={isModalOpen}
          onClose={toggle}
          editData={editData ?? undefined}
          mode={mode}
          // onSubmit={async (values) => {
          //   console.log(values);
          //   toggle();
          // }}
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
        <h1>Teachers</h1>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setMode("create");
          }}
        >
          + Add Teacher
        </Button>
      </div>
      <Table<Teacher>
        bordered
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
