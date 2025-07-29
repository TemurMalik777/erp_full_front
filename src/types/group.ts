import type { Lessons } from "./lesson";
import type { Student } from "./student";
import type { Teacher } from "./teacher";

export interface Group {
  id?: number;
  name: string;
  courseId?: number;
  status: "new" | "active" | "completed" | "cancelled" | "pending";
  start_date: string;
  start_time: string;
  roomId: number;
  course?: {
    id: number;
  };
  room?:{
    id:number
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

export interface AddGroupTeacher {
  groupId: number;
  teacherId: number[];
  status: boolean;
  start_date: string;
}
