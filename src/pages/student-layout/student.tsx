import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, type TablePaginationConfig, Tag, Tooltip } from "antd";
import StudentModal from "./student-model";
import { PopConfirm } from "@components";
import { useLocation, useNavigate } from "react-router-dom";
import { useStudent } from "@hooks";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { Student } from "@types";

function Student() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [editData, setEditData] = useState<Student | null>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const location = useLocation();
  const navigate = useNavigate();

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

  // YANGILANDI: useStudent hook'idan to'g'ri qiymatlarni olamiz
  const { data, isLoading, useStudentDelete, handlePagination } =
    useStudent(params);

  const { mutate: deleteFn, isPending: isDeleting } = useStudentDelete();

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

  // YANGILANDI: Paginatsiya funksiyasi to'g'ri chaqirilmoqda
  const handleTableChange = (pagination: TablePaginationConfig) => {
    handlePagination(pagination, setParams);
  };

  const columns = [
  // 1. Asosiy ustunlar saqlab qolindi
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a: Student, b: Student) => a.id! - b.id!,
  },
  {
    title: "Ism",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Familiya",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Telefon raqam",
    dataIndex: "phone", // Yoki "phone_number", API javobiga qarab to'g'rilang
    key: "phone",
  },
  {
    title: "Status",
    dataIndex: "is_active",
    key: "is_active",
    render: (isActive: boolean) => {
      const color = isActive ? "green" : "red";
      const text = isActive ? "Aktiv" : "Aktiv emas";
      return <Tag color={color}>{text}</Tag>;
    },
    filters: [
      { text: "Aktiv", value: true },
      { text: "Aktiv emas", value: false },
    ],
    onFilter: (value: any, record: Student) => record.is_active === value,
  },

  // 2. YANGI DIZAYNDAGI "ACTIONS" USTUNI
  {
    title: "Actions",
    key: "actions",
    render: (_: any, record: Student) => (
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
        <StudentModal
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
        dataSource={data?.data.data}
        rowKey={(row) => row.id!}
        loading={isLoading}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.data.total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
}

export default Student;
