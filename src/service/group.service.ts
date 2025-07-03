import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { Group } from "../types";

export const GroupService = {
  async getGroups() {
    const res = await apiConfig().getRequest(ApiUrls.GROUPS);
    return res;
  },

  async createGroup(model: Group) {
    const res = await apiConfig().postRequest(ApiUrls.GROUPS, model);
    return res;
  },

  async updateGroup(id: number, model: Partial<Group>) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.GROUPS}/${id}`,
      model
    );
    return res;
  },

  async deleteGroup(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.GROUPS}/${id}`);
    return res;
  },
};
