export interface Teacher {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  branchId: number[];
}

export interface GroupTeachers1 {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: "main teacher" | "assistant teacher";
}
