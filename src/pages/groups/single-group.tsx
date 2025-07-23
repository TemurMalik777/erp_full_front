import { useParams } from "react-router-dom";
import { useGroup } from "@hooks";
import { GroupLesson, GroupStudent, GroupTeacher } from "@components";

const SingleGroup = () => {
  const { id } = useParams<{ id: string }>()
  const { students, lessons, teachers} = useGroup({ page: 1, limit: 10}, Number(id))
  return (
    <div className="flex flex-col gap-[50px]">
      {teachers?.data.length > 0 && <GroupTeacher teachers={teachers?.data}/>}
      {lessons?.data.lessons.length > 0 && <GroupLesson lessons={lessons?.data.lessons}/>}
      {students?.data.length > 0 && <GroupStudent students={students?.data}/>}
    </div>
  );
};

export default SingleGroup;
