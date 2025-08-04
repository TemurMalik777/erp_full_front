import { StudentService } from "@service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType, Student } from "@types";
import { useNavigate } from "react-router-dom";

export const useStudent = (params?: ParamsType) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // useQuery'dan butun obyektni olamiz
  const studentsQuery = useQuery({
    queryKey: ["students", params], // queryKey'ni "students" (ko'plikda) deb o'zgartirgan ma'qul
    queryFn: () => StudentService.getStudents(params!),
  });

  // Paginatsiya funksiyasini shu hook'ning ichiga olamiz
  const handlePagination = (pagination: any, setParams: any) => {
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

  const useStudentCreate = () => {
    return useMutation({
      mutationFn: (data: Student) => StudentService.createStudent(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["students"] });
      },
    });
  };

  const useStudentUpdate = () => {
    return useMutation({
      mutationFn: ({ model, id }: { model: Student; id: number }) =>
        StudentService.updateStudent(model, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["students"] });
      },
    });
  };

  const useStudentDelete = () => {
    return useMutation({
      mutationFn: (id: number) => StudentService.deleteStudent(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["students"] });
      },
    });
  };
  
  // YANGILANDI: Qaytariladigan qiymatlar
  return {
    data: studentsQuery.data,
    isLoading: studentsQuery.isLoading,
    error: studentsQuery.error,
    handlePagination,
    useStudentCreate,
    useStudentUpdate,
    useStudentDelete,
  };
};