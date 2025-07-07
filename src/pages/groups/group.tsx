import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { GroupService } from "@service";
import { Button, Table, type TablePaginationConfig } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Group } from "@types";
import GroupFormModal from "./modal";

const Group = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 1000,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Group | null>(null);

  const featchGroups = async (page: number, pageSize: number) => {
    setLoading(true);
    const response = await GroupService.getGroups();
    if (response?.data?.data) {
      setGroups(response.data.data);
      setPagination({
        ...pagination,
        current: page,
        pageSize: pageSize,
        total: response.data.data.length,
      });
    }
    setLoading(false);
  };

  const handleDelete = async (id: number, onSuccess: () => void) => {
    try {
      await GroupService.deleteGroup(id);
      onSuccess();
    } catch (err) {
      console.error("O‘chirishda xatolik:", err);
    }
  };

  useEffect(() => {
    featchGroups(pagination.current!, pagination.pageSize!);
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    featchGroups(pagination.current!, pagination.pageSize!);
  };
  const columns: ColumnsType<Group> = [
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Kurs ID",
      dataIndex: "course_id",
      key: "course_id",
    },
    {
      title: "Boshlanish",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "Tugash",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Amallar",
      render: (_, record) => (
        <>
          <Button
            onClick={() => {
              setEditData(record);
              setModalOpen(true);
            }}
            style={{ marginRight: 8 }}
          >
            Tahrirlash
          </Button>

          <Button
            danger
            onClick={() => {
              if (window.confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
                handleDelete(record.id, () =>
                  featchGroups(pagination.current!, pagination.pageSize!)
                );
              }
            }}
          >
            O‘chirish
          </Button>
        </>
      ),
    },
  ];
  return (
    <div>
      <h1>Guruhlar</h1>
      <Button
        type="primary"
        onClick={() => {
          setEditData(null); // create uchun
          setModalOpen(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Yangi guruh
      </Button>
      <Table
        columns={columns}
        dataSource={groups}
        loading={loading}
        rowKey={(record) => record.id.toString()}
        pagination={pagination}
        onChange={handleTableChange}
      />
      <GroupFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() =>
          featchGroups(pagination.current!, pagination.pageSize!)
        }
        initialValues={editData}
      />
      <Outlet />
    </div>
  );
};

export default Group;
