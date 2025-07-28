import { GroupLesson, GroupStudent, GroupTeacher } from "@components";
import { useGroup } from "@hooks";
import {
  Calendar,
  Clock,
  Users,
  BookOpen,
  Timer,
} from "lucide-react";
import { useParams } from "react-router-dom";

const SingleGroup = () => {
  const { id } = useParams<{ id: string }>();
  const groupId = Number(id);
  const { dataById, students, lessons, teachers } = useGroup({}, Number(id));
  const groupData: any = dataById
    ? dataById.data.group
    : { course: { title: "", price: 0 } };


  const getStatusConfig = (status: string) => {
    switch (status) {
      case "new":
        return {
          bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
          text: "text-amber-700",
          border: "border-amber-200",
          dot: "bg-amber-400",
        };
      case "active":
        return {
          bg: "bg-gradient-to-r from-emerald-50 to-green-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          dot: "bg-emerald-400",
        };
      default:
        return {
          bg: "bg-gradient-to-r from-gray-50 to-slate-50",
          text: "text-gray-700",
          border: "border-gray-200",
          dot: "bg-gray-400",
        };
    }
  };

  const statusConfig = getStatusConfig(groupData.status);
  console.log(statusConfig);
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 gap-3" 
      style={{ margin: "-23px", borderRadius: "8px" }}
    >
      <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6 space-y-6">
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300 p-6 mb-6">
          <div className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-green-100 hover:border-green-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Start Date
                    </p>
                    <p className="font-semibold text-gray-900">
                      {groupData.start_date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-red-100 hover:border-red-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      End Date
                    </p>
                    <p className="font-semibold text-gray-900">
                      {groupData.end_date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-blue-100 hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Schedule
                    </p>
                    <p className="font-semibold text-gray-900">
                      {groupData.start_time} - {groupData.end_time}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-purple-100 hover:border-purple-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Students
                    </p>
                    <p className="font-semibold text-gray-900">12/15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-blue-50/40 rounded-2xl p-6 border-gray-100">
  <div className="flex items-center gap-3 mb-4">
    <div className="p-2 bg-indigo-100 rounded-lg">
      <BookOpen className="w-6 h-6 text-indigo-600" />
    </div>
    <h3 className="text-xl font-bold text-gray-900">
      {groupData.course?.title}
    </h3>
  </div>

  <p className="text-gray-700 leading-relaxed mb-6">
    {groupData.course?.description}
  </p>

  {/* Cardlar 1 qatorga olingan */}
  <div className="flex justify-center items-stretch gap-4">
    {/* Duration */}
    <div className="flex-1 text-center p-3 bg-white/70 rounded-xl border-orange-100">
      <div className="flex justify-center mb-2">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Calendar className="w-4 h-4 text-orange-600" />
        </div>
      </div>
      <p className="text-2xl font-bold text-orange-600">
        {groupData.course?.duration || "--"}
      </p>
      <p className="text-xs text-gray-600 uppercase tracking-wide">
        Months
      </p>
    </div>

    {/* Lessons Per Week */}
    <div className="flex-1 text-center p-3 bg-white/70 rounded-xl border-teal-100">
      <div className="flex justify-center mb-2">
        <div className="p-2 bg-teal-100 rounded-lg">
          <BookOpen className="w-4 h-4 text-teal-600" />
        </div>
      </div>
      <p className="text-2xl font-bold text-teal-600">
        {groupData.course?.lessons_in_a_week || "--"}
      </p>
      <p className="text-xs text-gray-600 uppercase tracking-wide">
        Per Week
      </p>
    </div>

    {/* Lesson Duration */}
    <div className="flex-1 text-center p-3 bg-white/70 rounded-xl border-indigo-100">
      <div className="flex justify-center mb-2">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Timer className="w-4 h-4 text-indigo-600" />
        </div>
      </div>
      <p className="text-2xl font-bold text-indigo-600">
        {groupData.course?.lesson_duration || "--"}
      </p>
      <p className="text-xs text-gray-600 uppercase tracking-wide">
        Minutes
      </p>
    </div>
  </div>
</div>




        </div>


        {teachers?.data && teachers.data.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-indigo-200 shadow-lg shadow-blue-900/5 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                {/* <Award className="w-5 h-5" /> */}
                Teachers
              </h2>
            </div>
            <div className="p-6">
              <GroupTeacher teachers={teachers.data} groupId={groupId} />
            </div>
          </div>
        )}

        {lessons?.data?.lessons && lessons.data.lessons.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-emerald-200 shadow-lg shadow-blue-900/5 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Lessons
              </h2>
            </div>
            <div className="p-6">
              <GroupLesson lessons={lessons.data.lessons} />
            </div>
          </div>
        )}

        {students?.data && students.data.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-blue-200 shadow-lg shadow-blue-900/5 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Users className="w-5 h-5" />
                Students ({students.data.length})
              </h2>
            </div>
            <div className="p-6">
              <GroupStudent students={students.data} groupId={groupId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleGroup;



