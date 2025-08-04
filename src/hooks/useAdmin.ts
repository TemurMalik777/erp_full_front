import { useQuery } from "@tanstack/react-query";
import { adminService } from "@service";

export const useAdmin = () => {
  // useQuery'dan faqat 'data'ni emas, balki 'isLoading' va 'error'ni ham olamiz
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin"],
    queryFn: () => adminService.adminProfile(),
  });

  // Endi barcha kerakli qiymatlarni qaytaramiz
  return {
    data,
    isLoading,
    error,
  };
};
