import { GroupService } from "@service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Group } from "@types";
import { useNavigate } from "react-router-dom";

// YANGI QO'SHILDI: O'chirish uchun payload type'lari
interface DeleteStudentPayload {
  groupId: number;
  studentId: number;
}

interface DeleteTeacherPayload {
  groupId: number;
  teacherId: number;
}

export const useGroup = (params: any, id?: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Guruhlar ro'yxatini olish uchun query
  const groupsQuery = useQuery({
    queryKey: ["groups", params],
    queryFn: () => GroupService.getGroups(params),
    enabled: !id, // Faqat id yo'q bo'lganda ishlasin
  });

  // ID bo'yicha bitta guruh ma'lumotini olish uchun query
  const groupByIdQuery = useQuery({
    queryKey: ["groupById", id],
    queryFn: () => GroupService.getGroupById(id!),
    enabled: !!id, // Faqat id mavjud bo'lganda ishlasin
  });

  // Guruh o'quvchilarini olish
  const groupStudentsQuery = useQuery({
    queryKey: ["group-students", id],
    queryFn: () => GroupService.getGroupsStudent(id!),
    enabled: !!id,
  });

  // Guruh darslarini olish
  const groupLessonsQuery = useQuery({
    queryKey: ["group-lessons", id],
    queryFn: () => GroupService.getGroupsLessons(id!),
    enabled: !!id,
  });

  // Guruh o'qituvchilarini olish
  const groupTeachersQuery = useQuery({
    queryKey: ["group-teachers", id],
    queryFn: () => GroupService.getGroupsTeachers(id!),
    enabled: !!id,
  });

  // Yagona yuklanish holati
  const isSingleGroupLoading =
    groupByIdQuery.isLoading ||
    groupStudentsQuery.isLoading ||
    groupLessonsQuery.isLoading ||
    groupTeachersQuery.isLoading;

  const handlePagination = (pagination: any, setParams: any) => {
    // ...bu qism o'zgarishsiz qoladi
    const { current, pageSize } = pagination;
    setParams({
      page: current!,
      limit: pageSize!,
    });
    const searchParams = new URLSearchParams();
    searchParams.set("page", current!.toString());
    searchParams.set("limit", pageSize!.toString());
    navigate({ search: `?${searchParams.toString()}` });
  };

  const useGroupCreate = () => {
    return useMutation({
      mutationFn: (data: Group) => GroupService.createGroup(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useGroupUpdate = () => {
    return useMutation({
      mutationFn: ({ model, id }: { model: Group; id: number }) =>
        GroupService.updateGroup(model, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
        queryClient.invalidateQueries({ queryKey: ["groupById", id] });
      },
    });
  };

  const useGroupDelete = () => {
    return useMutation({
      mutationFn: (id: number) => GroupService.deleteGroup(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useAssignTeacherToGroup = () => {
    return useMutation({
      mutationFn: (payload: {
        groupId: number;
        teacherId: number[];
        status: boolean;
        start_date: string;
      }) => GroupService.assignTeachersToGroup(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["group-teachers"] });
      },
    });
  };
  const useAssignStudentToGroup = () => {
    return useMutation({
      mutationFn: (payload: any) => GroupService.assignStudentsToGroup(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["group-students"] });
      },
    });
  };

  // YANGI QO'SHILDI: Guruhdan o'qituvchini o'chirish mutatsiyasi
  const useDeleteTeacherFromGroup = () => {
    return useMutation({
      mutationFn: (payload: DeleteTeacherPayload) =>
        GroupService.deleteTeacherFromGroup(payload),
      onSuccess: (_, variables) => {
        // O'qituvchilar ro'yxatini yangilash uchun
        queryClient.invalidateQueries({
          queryKey: ["group-teachers", variables.groupId],
        });
        // Asosiy ma'lumotdagi o'qituvchi nomini ham yangilash uchun
        queryClient.invalidateQueries({
            queryKey: ["groupById", variables.groupId],
        });
      },
    });
  };

  // YANGI QO'SHILDI: Guruhdan o'quvchini o'chirish mutatsiyasi
  const useDeleteStudentFromGroup = () => {
    return useMutation({
      mutationFn: (payload: DeleteStudentPayload) =>
        GroupService.deleteStudentFromGroup(payload),
      onSuccess: (_, variables) => {
        // O'quvchilar ro'yxatini yangilash uchun
        queryClient.invalidateQueries({
          queryKey: ["group-students", variables.groupId],
        });
      },
    });
  };

  return {
    // Guruhlar ro'yxati uchun
    groups: groupsQuery.data,
    isGroupsLoading: groupsQuery.isLoading,

    // Bitta guruh sahifasi uchun
    group: groupByIdQuery.data,
    students: groupStudentsQuery.data,
    lessons: groupLessonsQuery.data,
    teachers: groupTeachersQuery.data,
    isSingleGroupLoading,
    groupByIdError: groupByIdQuery.error,

    // Mutatsiyalar va boshqa funksiyalar
    useGroupCreate,
    useGroupDelete,
    useGroupUpdate,
    handlePagination,
    useAssignTeacherToGroup,
    useAssignStudentToGroup,
    useDeleteTeacherFromGroup, // <-- YANGI
    useDeleteStudentFromGroup, // <-- YANGI
  };
};