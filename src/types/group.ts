import type { Lessons } from "./lesson";
import type { Student } from "./student";
import type { Teacher } from "./teacher";

export interface Group {
  id?: number;
  name: string;
  course_id: number;
  status: "active" | "inactive";
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  roomId: number;
  course: {
    id: number
  }
}

export interface GroupLessons {
  lessons: Lessons[];
}

export interface GroupStudents {
  students: Student[];
}

export interface GroupTeachers {
  teachers: Teacher[];
}
