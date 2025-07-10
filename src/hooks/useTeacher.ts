// import { TeacherService } from "@service";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import type { Teacher } from "@types";

// export const useTeacher = () => {
//   const queryClient = useQueryClient();
//   const { data } = useQuery({
//     queryKey: ["teacher"],
//     queryFn: async () => TeacherService.getTeachers(),
//   });
//   const useTeacherCreaete = () => {
//     return useMutation({
//       mutationFn: async (data: Teacher) => TeacherService.createTeacher(data),
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["teacher"] });
//       },
//     });
//   };
//   const useTeacherUpdate = () => {
//     return useMutation({
//       mutationFn: async ({ model, id }: { model: Teacher; id: number }) =>
//         TeacherService.updateTeacher(model, id),
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["teacher"] });
//       },
//     });
//   };
//   const useTeacherDelete = () => {
//     return useMutation({
//       mutationFn: async (id: number) => TeacherService.deleteTeacher(id),
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["teacher"] });
//       },
//     });
//   };
//   return {
//     data,
//     useTeacherCreaete,
//     useTeacherUpdate,
//     useTeacherDelete,
//   };
// };



import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TeacherService } from "@service";
import type { Teacher } from "@types";
import { message } from "antd";

// GET ALL TEACHERS
export const useTeachers = () => {
  return useQuery({
    queryKey: ["teacher"],
    queryFn: async () => {
      const res = await TeacherService.getTeachers();
      return res; // faqat o'qituvchilar arrayi
    },
  });
};

// CREATE TEACHER
export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Teacher) => TeacherService.createTeacher(data),
    onSuccess: () => {
      message.success("Teacher created");
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
    },
    onError: () => {
      message.error("Failed to create teacher");
    },
  });
};

// UPDATE TEACHER
export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ model, id }: { model: Teacher; id: number }) =>
      TeacherService.updateTeacher(model, id),
    onSuccess: () => {
      message.success("Teacher updated");
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
    },
    onError: () => {
      message.error("Failed to update teacher");
    },
  });
};

// DELETE TEACHER
export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => TeacherService.deleteTeacher(id),
    onSuccess: () => {
      message.success("Teacher deleted");
      queryClient.invalidateQueries({ queryKey: ["teacher"] });
    },
    onError: () => {
      message.error("Failed to delete teacher");
    },
  });
};
