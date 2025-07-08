import { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { Course } from "@types";
import { CoursService } from "@service";
import Coursesmodal from "./course-modal";

interface CourseWithId extends Course {
  id: number;
  // qo‘shimcha maydonlar bo‘lsa qo‘shishingiz mumkin
}

function Courses() {
  const [courses, setCourses] = useState<CourseWithId[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<CourseWithId | null>(null);

  const fetchCourses = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const res = await CoursService.getCourses();
      if (res?.data?.courses) {
        setCourses(res.data.courses);
        setPagination({
          ...pagination,
          current: page,
          pageSize,
          total: res.data.courses.length,
        });
      }
    } catch {
      message.error("Kurslarni yuklashda xatolik yuz berdi");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses(pagination.current!, pagination.pageSize!);
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    fetchCourses(pagination.current!, pagination.pageSize!);
  };

  const handleDelete = async (id: number) => {
    try {
      await CoursService.deleteCourses(id);
      message.success("Kurs o‘chirildi");
      fetchCourses(pagination.current!, pagination.pageSize!);
    } catch {
      message.error("O‘chirishda xatolik yuz berdi");
    }
  };

  const handleSubmit = async (values: Course) => {
    const payload = {
      title: values.title,
      description: values.description,
      price: values.price,
      duration: values.duration,
      lessons_in_a_week: values.lessons_in_a_week,
      lesson_duration: values.lesson_duration,
    };

    try {
      if (editData) {
        const res = await CoursService.updateCourses(payload, editData.id);
        if (res?.status === 200) {
          message.success("Kurs tahrirlandi");
        }
      } else {
        const res = await CoursService.createCourses(payload);
        if (res?.status === 201 || res?.status === 200) {
          message.success("Kurs yaratildi");
        }
      }
      fetchCourses(pagination.current!, pagination.pageSize!);
      setIsModalOpen(false);
      setEditData(null);
    } catch {
      message.error("Yaratishda yoki tahrirlashda xatolik yuz berdi");
    }
  };

  const columns: ColumnsType<CourseWithId> = [
    { title: "Nomi", dataIndex: "title", key: "title" },
    { title: "Tavsif", dataIndex: "description", key: "description" },
    { title: "Narxi", dataIndex: "price", key: "price" },
    { title: "Davomiyligi", dataIndex: "duration", key: "duration" },
    { title: "Haftada darslar soni", dataIndex: "lessons_in_a_week", key: "lessons_in_a_week" },
    { title: "Dars davomiyligi", dataIndex: "lesson_duration", key: "lesson_duration" },
    {
      title: "Amallar",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            onClick={() => {
              setEditData(record);
              setIsModalOpen(true);
            }}
          >
            Tahrirlash
          </Button>
          <Button
            danger
            onClick={() => {
              if (window.confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
                handleDelete(record.id);
              }
            }}
          >
            O‘chirish
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
        <h2>Kurslar</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        >
          + Kurs qo‘shish
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={courses}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={pagination}
        onChange={handleTableChange}
      />

      <Coursesmodal
        visible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        editData={editData ?? undefined}
      />
    </div>
  );
}

export default Courses;
