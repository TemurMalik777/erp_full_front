import {useEffect, useState } from "react";
import { Button, Space, Table, type TablePaginationConfig } from "antd";
import GroupModal from "./modal";
import type { Group, 
    // TablePagination

 } from "@types";
import { PopConfirm, GroupColumns } from "@components";
import { useLocation } from "react-router-dom";
import { 
    useGeneral,
     useGroup } from "@hooks";



function Groups() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [update, setUpdate] = useState<Group | null>(null);
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
//   const handleTableChange = (paginnation: TablePagination) => {
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
            {/* <EditOutlined/> */}
            edit
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
      {open && (
        <GroupModal
        // <ModalProps
          open={open}
          toggle={toggle}
          update={update}
          mode={mode}
        />
      )}
      <h1>Groups</h1>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add group
      </Button>
      <Table <Group>
      columns={columns}
      dataSource={data?.data.data}
      rowKey={(row) => row.id!}
      pagination={{
        current: params.page,
        pageSize: params.limit,
        total: data?.data.total,
        showSizeChanger: true,
        pageSizeOptions:["3", "4","5", "6", "10"],
      }}
      onChange={handleTableChange}
      />
    </>
  );
}

export default Groups;
