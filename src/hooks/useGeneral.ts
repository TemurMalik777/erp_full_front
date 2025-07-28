import { GeneralService } from "@service";
import { useMutation } from "@tanstack/react-query";
import { type PaginationConfig } from "@types";
import { useNavigate } from "react-router-dom";

export const useGeneral = () => {
  const navigate = useNavigate();

  const handlePagination = ({ pagination, setParams }: PaginationConfig) => {
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

  const updateLessonStatus = () => {
    return useMutation({
      mutationFn: ({
        id,
        status,
        note,
      }: {
        id: number;
        status: string;
        note?: string;
      }) => GeneralService.updateLessonStatus(id, { status, note }),
    });
  };

  return { handlePagination, updateLessonStatus };
};
