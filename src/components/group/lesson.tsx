import LessonList from "../lessons-list/lesson-list";

function GroupLesson({ lessons }: any) {
  return <LessonList lessons={lessons} />;
}

export default GroupLesson;
