import { BranchService } from "@service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Branch } from "@types";

export const useBranch = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["branches"],
    queryFn: async () => BranchService.getBranches(),
  });
  const useBranchCreate = () => {
    return useMutation({
      mutationFn: async (data: Branch) => BranchService.createBranch(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["branches"] });
      },
    });
  };
  const useBranchUpdate = () => {
    return useMutation({
      mutationFn: async ({ model, id }: { model: Branch; id: number }) =>
        BranchService.updateBranch(model, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["branches"] });
      },
    });
  };
  const useBranchDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => BranchService.deleteBranch(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["branches"] });
      },
    });
  };
  return {
    data,
    useBranchCreate,
    useBranchUpdate,
    useBranchDelete,
  };
};
