import { useEffect, useState } from "react";
import { Button, Space, Table, type TablePaginationConfig } from "antd";
import GroupModal from "./modal";
import type { Group } from "@types";
import { PopConfirm, GroupColumns } from "@components";
import { Link, useLocation } from "react-router-dom";
import { useGeneral, useGroup } from "@hooks";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
function Groups() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [update, setUpdate] = useState<Group | null>(null);
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
  const { data, useGroupDelete } = useGroup(params);
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useGroupDelete();
  const deleteItem = (id: number) => {
    deleteFn(id);
  };
  const editItem = (record: Group) => {
    setUpdate(record);
    setMode("update");
    setOpen(true);
  };
  const toggle = () => {
    setOpen(!open);
    if (update) {
      setUpdate(null);
    }
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination({ pagination, setParams });
  };
  const columns = [
    ...(GroupColumns ?? []),
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Group) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editItem(record)}>
            <EditOutlined />
          </Button>
          <PopConfirm
            onConfirm={() => deleteItem(record.id!)}
            loading={isDeleting}
          />
          <Link to={`group/${record.id}`}>
            <EyeOutlined style={{ fontSize: "20px" }} />
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <>
      {open && (
        <GroupModal open={open} toggle={toggle} update={update} mode={mode} />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h1>Groups</h1>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
            setMode("create");
          }}
        >
          + Add group
        </Button>
      </div>
      <Table<Group>
        bordered
        columns={columns}
        dataSource={data?.data.data}
        rowKey={(row) => row.id!}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.data.total,
          showSizeChanger: true,
          pageSizeOptions: ["3", "4", "5", "6", "10"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
}

export default Groups;
