import { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import GroupModal from "./modal";
import type { Group } from "@types";
import { CoursService, GroupService } from "@service";

interface GroupWithId extends Group {
  id: number;
  created_at?: string;
  updated_at?: string;
}

interface Course {
  id: number;
  title: string;
}

function Groups() {
  const [groups, setGroups] = useState<GroupWithId[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 1,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<GroupWithId | null>(null);

  const fetchGroups = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const response = await GroupService.getGroups();
      if (response?.data?.data) {
        setGroups(response.data.data);
        setPagination({
          ...pagination,
          current: page,
          pageSize,
          total: response.data.data.length,
        });
      }
    } catch {
      message.error("Failed to load groups");
    }
    setLoading(false);
  };

  const fetchCourses = async () => {
    try {
      const res = await CoursService.getCourses();
      if (res && res.data && res.data.courses) {
        setCourses(res.data.courses);
      } else {
        setCourses([]);
      }
    } catch {
      message.error("Failed to load courses");
    }
  };

  useEffect(() => {
    fetchGroups(pagination.current!, pagination.pageSize!);
    fetchCourses();
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    fetchGroups(pagination.current!, pagination.pageSize!);
  };

  const handleDelete = async (id: number) => {
    try {
      await GroupService.deleteGroup(id);
      message.success("Group deleted successfully");
      fetchGroups(pagination.current!, pagination.pageSize!);
    } catch {
      message.error("Failed to delete group");
    }
  };

  const handleSubmit = async (values: Group) => {
    const payload = {
      name: values.name,
      course_id: values.course_id,
      status: values.status,
      start_date: values.start_date,
      end_date: values.end_date,
    };

    try {
      if (editData) {
        const res = await GroupService.updateGroup(payload, editData.id);
        if (res?.status === 200) {
          message.success("Group updated successfully");
        }
      } else {
        const res = await GroupService.createGroup(payload);
        if (res?.status === 201 || res?.status === 200) {
          message.success("Group created successfully");
        }
      }
      fetchGroups(pagination.current!, pagination.pageSize!);
      setIsModalOpen(false);
      setEditData(null);
    } catch {
      message.error("Error creating or updating group");
    }
  };

  const columns: ColumnsType<GroupWithId> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Course ID", dataIndex: "course_id", key: "course_id" },
    { title: "Start Date", dataIndex: "start_date", key: "start_date" },
    { title: "End Date", dataIndex: "end_date", key: "end_date" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            onClick={() => {
              setEditData(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this group?")) {
                handleDelete(record.id);
              }
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2>Groups</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          + Add Group
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={groups}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <GroupModal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        editData={editData ?? undefined}
        courses={courses}
      />
    </div>
  );
}

export default Groups;