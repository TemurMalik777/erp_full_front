import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { Teacher } from "@types";

export const TeacherService = {
  async getTeachers() {
    const res = await apiConfig().getRequest(ApiUrls.TEACHER);
    return res;
  },
  async createTeacher(model: Teacher) {
    const res = await apiConfig().postRequest(ApiUrls.TEACHER, model);
    return res;
  },
  async updateTeacher(model: Teacher, id: number): Promise<any> {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.TEACHER}/${id}`,
      model
    );
    return res;
  },
  async deleteTeacher(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.TEACHER}/${id}`);
    return res;
  },
};
