import type { GroupLessons, Lessons } from "@types";
import { Button, Tooltip } from "antd";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import { LessonModal } from "./lesson-modal";

const LessonList = ({ lessons }: GroupLessons) => {
  const [selectedLesson, setSelectedLesson] = useState<Lessons | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  return (
    <div className="flex gap-1 items-center">
      <Button type="primary" onClick={goPrev} disabled={isStartDisabled()}>
        prev
      </Button>
      <div
        className="overflow-scroll flex 
        gap-[4px]
        [&::-webkit-scrollbar]:hidden
        "
        ref={containerRef}
        onScroll={handleScroll}
      >
        {lessons.map((lessons: Lessons, index: number) => {
          const formattedDate = dayjs(lessons.date).format("MM.DD");
          return (
            <div
              key={lessons.id}
              className="min-w-[40px] h-[30px] bg-[#ccc] rounded-sm flex items-center justify-center "
            >
              <Tooltip key={lessons.id} title={`Dars ${index + 1}`}>
                <div
                  className="gap-4 min-w-[10px] max-w-[10px] h-[30px] bg-[#ccc] rounded-sm flex items-center justify-center cursor-pointer"
                  onClick={() => setSelectedLesson(lessons)}
                >
                  <span>{formattedDate}</span>
                </div>
              </Tooltip>
            </div>
          );
        })}
      </div>
      <Button type="primary" onClick={goNext} disabled={isEndDisabled()}>
        prev
      </Button>

      {selectedLesson && (
        <LessonModal
          lesson={selectedLesson}
          open={!!selectedLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </div>
  );
};

export default LessonList;
