import type { GroupStudents } from "@types";
const GroupStudent = ({students}: GroupStudents) => {
    console.log(students);
  return (
    <div>
      <h1>GroupStudent</h1>
    </div>
  );
};

export default GroupStudent;
