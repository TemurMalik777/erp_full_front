import { GroupService } from "@service";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { type Group } from "@types";

export const useGroup = () => {
  const queryClient = useQueryClient();
  const { data,refetch } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => GroupService.getGroups(),
  });

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
    refetch,
    useGroupCreate,
    useGroupDelete,
    useGroupUpdate,
  };
};
