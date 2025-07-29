import { Button, message, Tooltip, Tag } from "antd";
import { useRef, useState, useMemo } from "react";
import dayjs from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useGeneral } from "@hooks";
import LessonModal from "./lesson-modal";

function LessonLists({ lessons }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("pending");
  const [description, setDescription] = useState("");
  const { updateLessonStatus } = useGeneral();
  const { mutate: updateFn } = updateLessonStatus();

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  const goNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 50, behavior: "smooth" });
    }
  };

  const goPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -50, behavior: "smooth" });
    }
  };

  const isStartDisabled = () => {
    if (!containerRef.current) return true;
    return scrollPosition <= 5;
  };

  const isEndDisabled = () => {
    if (!containerRef.current) return true;
    const container = containerRef.current;
    return scrollPosition + container.clientWidth >= container.scrollWidth - 3;
  };

  const handleLessonClick = (lesson: any, index: number) => {
    setSelectedLesson({ ...lesson, index });
    setStatus(lesson.status || "pending");
    setDescription(lesson.description || "");
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    if (!selectedLesson) return;

    updateFn(
      {
        id: selectedLesson.id,
        status,
        note: description,
      },
      {
        onSuccess: () => {
          message.success("The lesson status has been successfully updated");
        },
        onError: () => {
          message.error("An error has occurred");
        },
      }
    );

    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "cancelled":
        return "#f87171";
      case "in_progress":
        return "#facc15";
      case "completed":
        return "#bbf7d0";
      case "new":
        return "#60a5fa";
      default:
        return "#e5e7eb";
    }
  };

  // ✅ Status bo‘yicha hisob-kitob
  const statusCounts = useMemo(() => {
    return lessons.reduce(
      (acc: any, lesson: any) => {
        const s = lesson.status?.toLowerCase() || "pending";
        acc[s] = (acc[s] || 0) + 1;
        return acc;
      },
      { new: 0, cancelled: 0, completed: 0, in_progress: 0 }
    );
  }, [lessons]);

  return (
    <div
      className="relative mt-6"
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Darslar Jadvali
        </h2>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">
            Jami <span className="font-semibold">{lessons.length}</span> ta dars
          </span>

          <div className="flex items-center gap-2">
            <Tag color="blue">New: {statusCounts.new}</Tag>
            <Tag color="red">Cancelled: {statusCounts.cancelled}</Tag>
            <Tag color="green">Completed: {statusCounts.completed}</Tag>
            <Tag color="gold">In Progress: {statusCounts.in_progress}</Tag>
          </div>
        </div>
      </div>

      <div className="relative bg-white rounded-2xl overflow-hidden">
        {/* Gradient soyalar chetlarga */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex items-center p-4 gap-3">
          <Button
            shape="circle"
            icon={<LeftOutlined />}
            onClick={goPrev}
            disabled={isStartDisabled()}
          />

          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 flex overflow-x-auto overflow-y-hidden py-4 px-3 gap-4 scroll-smooth rounded-3xl bg-gray-50 shadow-inner [&::-webkit-scrollbar]:hidden"
            style={{ display: "flex", gap: "5px" }}
          >
            {lessons.map((lesson: any, index: number) => {
              const formattedDate = dayjs(lesson.date).format("DD.MM");
              const dayName = dayjs(lesson.date).format("ddd").toUpperCase();
              const backgroundColor = getStatusColor(lesson.status);

              return (
                <Tooltip
                  key={lesson.id}
                  title={
                    <div
                      className="text-center"
                      style={{ display: "flex", gap: "10px" }}
                    >
                      <div className="font-semibold">Dars {index + 1}</div>
                      {lesson.notes && (
                        <div className="text-xs mt-1">{lesson.notes}</div>
                      )}
                    </div>
                  }
                >
                  <div
                    className="min-w-[70px] h-[70px] rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 !border !border-gray-300 shadow-md hover:shadow-lg"
                    style={{
                      borderRadius: "20px",
                      backgroundColor,
                      border: "1px solid #e5e7eb",
                    }}
                    onClick={() => handleLessonClick(lesson, index)}
                  >
                    <div className="text-xs opacity-75">{dayName}</div>
                    <div className="text-sm font-bold">{formattedDate}</div>
                  </div>
                </Tooltip>
              );
            })}
          </div>

          <Button
            shape="circle"
            icon={<RightOutlined />}
            onClick={goNext}
            disabled={isEndDisabled()}
          />
        </div>
      </div>

      <LessonModal
        open={isModalOpen}
        lesson={selectedLesson}
        status={status}
        description={description}
        onChangeStatus={setStatus}
        onChangeDescription={setDescription}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      />
    </div>
  );
}

export default LessonLists;
