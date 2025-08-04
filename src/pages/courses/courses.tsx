import { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, Tooltip, type TablePaginationConfig } from "antd";
import Coursesmodal from "./course-modal";
import type { Course } from "@types";
import { PopConfirm, CourseColumns } from "@components";
import { useLocation } from "react-router-dom";
import { useGeneral, useCourse } from "@hooks";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface CourseWithId extends Course {
  id: number;
}

function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [editData, setEditData] = useState<CourseWithId | null>(null);
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

  const { data, useCourseDelete } = useCourse();
  const { handlePagination } = useGeneral();
  const { mutate: deleteFn, isPending: isDeleting } = useCourseDelete();

  const deleteItem = (id: number) => {
    deleteFn(id);
  };

  const editItem = (record: CourseWithId) => {
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
  ...(CourseColumns<CourseWithId>() ?? []),

  // 2. YANGI DIZAYNDAGI "ACTIONS" USTUNI
  {
    title: "Actions",
    key: "actions",
    render: (_: any, record: CourseWithId) => (
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
        <Coursesmodal
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
        <h1>Courses</h1>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setMode("create");
          }}
        >
          + Add Course
        </Button>
      </div>
      <Table<CourseWithId>
        bordered
        columns={columns}
        dataSource={data?.data.courses}
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
export default Courses;
