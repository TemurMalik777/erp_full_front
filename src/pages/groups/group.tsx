import { useEffect, useState } from "react";
import {
  Button,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  type TablePaginationConfig,
} from "antd";
import GroupModal from "./modal";
import type { Group } from "@types";
import { PopConfirm, GroupColumns } from "@components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGroup } from "@hooks";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

function Groups() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [update, setUpdate] = useState<Group | null>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const location = useLocation();
  const navigate = useNavigate(); // useNavigate hook'ini chaqiramiz

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

  const { groups, isGroupsLoading, useGroupDelete, handlePagination } =
    useGroup(params);

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
    handlePagination(pagination, setParams);
  };

  const columns = [
    ...(GroupColumns ?? []),

    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Group) => (
        <Space size="middle">
          {/* 1. Tahrirlash (Update) ikonasi */}
          <Tooltip title="Tahrirlash">
            <Button
              type="text" // Faqat ikona ko'rinishi uchun
              shape="circle" // Dumaloq shakl
              icon={
                <EditOutlined style={{ fontSize: "18px", color: "#52c41a" }} />
              } // Yashil rang
              onClick={() => editItem(record)} // editItem funksiyangiz
            />
          </Tooltip>

          {/* 2. O'chirish (Delete) ikonasi - XATOLIK TUZATILDI */}
          <Popconfirm
            title="O'chirish"
            description="Haqiqatan ham o'chirmoqchimisiz?"
            onConfirm={() => deleteItem(record.id!)} // deleteItem funksiyangiz
            okText="Ha"
            cancelText="Yo'q"
            okButtonProps={{ loading: isDeleting }} // isDeleting o'zgaruvchingiz
          >
            <Tooltip title="O'chirish">
              <Button
                type="text"
                shape="circle"
                icon={
                  <DeleteOutlined
                    style={{ fontSize: "18px", color: "#faad14" }}
                  />
                } // Chiroyli sarg'ish rang
              />
            </Tooltip>
          </Popconfirm>

          {/* 3. Ko'rish (View) ikonasi */}
          <Tooltip title="Batafsil ko'rish">
            <Link to={`/admin/groups/${record.id}`}>
              {" "}
              {/* Manzilni to'g'rilashni unutmang */}
              <Button
                type="text"
                shape="circle"
                icon={
                  <ArrowRightOutlined
                    style={{ fontSize: "18px", color: "rgba(0, 0, 0, 0.45)" }}
                  />
                } // Neytral kulrang
              />
            </Link>
          </Tooltip>
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
        // YANGILANDI: `data` o'rniga `groups` ishlatiladi
        dataSource={groups?.data.data}
        rowKey={(row) => row.id!}
        // YANGILANDI: Jadval yuklanayotganda 'loading' holatini ko'rsatadi
        loading={isGroupsLoading}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          // YANGILANDI: `data` o'rniga `groups` ishlatiladi
          total: groups?.data.total,
          showSizeChanger: true,
          pageSizeOptions: ["3", "4", "5", "6", "10"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
}

export default Groups;
