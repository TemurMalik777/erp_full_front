import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { ParamsType, Student } from "@types";

export const StudentService = {
  async getStudents(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.STUDENT, params);
    return res;
  },

  async createStudent(model: Student) {
    const res = await apiConfig().postRequest(ApiUrls.STUDENT, model);
    return res;
  },

  async updateStudent(model: Student, id: number): Promise<any> {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.STUDENT}/${id}`,
      model
    );
    return res;
  },
  async deleteStudent(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.STUDENT}/${id}`);
    return res;
  },
};
