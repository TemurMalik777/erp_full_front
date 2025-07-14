import { GroupService } from "@service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Group, type ParamsType } from "@types";
import { useNavigate } from "react-router-dom";
export const useGroup = (params: ParamsType) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["groups", params],
    queryFn: async () => GroupService.getGroups(params),
  });
  const handlePagination = (pagination: any, setParams: any)=>{
    const { current, pageSize } = pagination;
    setParams({
      page: current!,
      limit: pageSize!,
    });
    const searchParams = new URLSearchParams();
    searchParams.set("page", current!.toString());
    searchParams.set("limit", pageSize!.toString());
    navigate({ search: `?${searchParams.toString()}` });
  }

  const useGroupCreate = () => {
    return useMutation({
      mutationFn: async (data: Group) => GroupService.createGroup(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useGroupUpdate = () => {
    return useMutation({
      mutationFn: async ({ model, id }: { model: Group; id: number }) =>
        GroupService.updateGroup(model, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useGroupDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => GroupService.deleteGroup(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  return {
    data,
    useGroupCreate,
    useGroupDelete,
    useGroupUpdate,
    handlePagination,
  };
};
