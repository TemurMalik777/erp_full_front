// import type { GroupTeachers } from "@types";
// const GroupTeacher = ({teachers}:GroupTeachers) => {
//     console.log("gudgahdfyewb", teachers);
//   return (
//     <div>
//       <h1>GroupTeachr</h1>
//     </div>
//   );
// };

// export default GroupTeacher;



import { Card, Avatar } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

function GroupTeachers({ teachers }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-2">
      {teachers.map((item: any) => {
        const { teacher, start_date, end_date } = item;
        const fullName = `${teacher.first_name} ${teacher.last_name}`;
        const avatar = teacher.avatar_url || "";

        return (
          <Card
            key={teacher.id}
            className="border rounded-lg"
          >
            <div className="flex flex-col items-center text-center">
              <Avatar
                size={65}
                src={avatar || undefined}
                icon={!avatar && <UserOutlined />}
                className="mb-2"
              />
              <div className="font-medium">Name: {fullName}</div>
              <div className="text-xs text-gray-500">Role: {teacher.role}</div>

              <div className="mt-2 text-xs text-gray-600">
                <div>
                  <CalendarOutlined /> {start_date} - {end_date}
                </div>
                <div 
                // className="mt-1"
                >
                  <MailOutlined /> {teacher.email}
                </div>
                <div className="mt-1">
                  <PhoneOutlined /> {teacher.phone}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default GroupTeachers;
