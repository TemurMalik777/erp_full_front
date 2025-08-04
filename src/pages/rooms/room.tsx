import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, Tooltip, type TablePaginationConfig } from "antd";
import RoomModal from "./room-modal";
import type { Room } from "@types";
import { PopConfirm, RoomColumns } from "@components";
import { useLocation } from "react-router-dom";
import { useGeneral, useRoom } from "@hooks";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function Rooms() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [update, setUpdate] = useState<Room | null>(null);
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

  const { data, useRoomDelete } = useRoom(params);
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useRoomDelete();
  const deleteItem = (id: number) => {
    deleteFn(id);
  };

  const editItem = (record: Room) => {
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
  // 1. Asosiy ustunlar saqlab qolindi
  ...(RoomColumns ?? []),

  // 2. YANGI DIZAYNDAGI "ACTIONS" USTUNI
  {
    title: "Actions",
    key: "actions",
    render: (_: any, record: Room) => (
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
      {open && (
        <RoomModal open={open} toggle={toggle} update={update} mode={mode} />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h1>Room</h1>
        <Button
          type="primary"
          onClick={() => {
            setOpen(true);
            setMode("create");
          }}
        >
          + Add room
        </Button>
      </div>
      <Table<Room>
        bordered
        columns={columns}
        dataSource={data?.data.rooms}
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

export default Rooms;
