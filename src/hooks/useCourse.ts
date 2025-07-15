import { CoursService } from "@service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Course } from "@types";

export const useCourse = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => CoursService.getCourses(),
  });



  const useCourseCreate = () => {
    return useMutation({
      mutationFn: async (data: Course) => CoursService.createCourses(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
    });
  };
  const useCourseUpdate = () => {
    return useMutation({
      mutationFn: async ({ model, id }: { model: Course; id: number }) =>
        CoursService.updateCourses(model, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
    });
  };
  const useCourseDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => CoursService.deleteCourses(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
    });
  };

  return {
    data,
    useCourseCreate,
    useCourseUpdate,
    useCourseDelete,
  };
};





// import { CoursService } from "@service";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import type { Course } from "@types";

// export const useCourse = () => {
//   const queryClient = useQueryClient();

//   const {
//     data: courses,
//     isLoading,
//     isError,
//     error,
//   } = useQuery<Course[], Error>({
//     queryKey: ["courses"],
//     queryFn: async () => {
//       const res = await CoursService.getCourses();
//       return res?.data; // Faqatgina kurslar massivini qaytaramiz

//     },
//   });

//   const useCourseCreate = () => {
//     return useMutation({
//       mutationFn: async (data: Course) => CoursService.createCourses(data),
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["courses"] });
//       },
//     });
//   };

//   const useCourseUpdate = () => {
//     return useMutation({
//       mutationFn: async ({ model, id }: { model: Course; id: number }) =>
//         CoursService.updateCourses(model, id),
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["courses"] });
//       },
//     });
//   };

//   const useCourseDelete = () => {
//     return useMutation({
//       mutationFn: async (id: number) => CoursService.deleteCourses(id),
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["courses"] });
//       },
//     });
//   };

//   return {
//     courses,       // bu endi Course[] (massiv) tipida
//     isLoading,
//     isError,
//     error,
//     // data,
//     useCourseCreate,
//     useCourseUpdate,
//     useCourseDelete,
//   };
// };
