export interface Group {
  id?: number;
  name: string;
  course_id: number;
  // status: string;
  status: "active" | "inactive";
  start_date: string;
  end_date: string;
    start_time: string
  end_time: string
  roomId:number
}
