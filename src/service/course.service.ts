import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { Course } from "../types";

export const CoursService = {
  async getCourses() {
    const res = await apiConfig().getRequest(ApiUrls.COURSE);
    return res;
  },

  async createCourses(model: Course) {
    const res = await apiConfig().postRequest(ApiUrls.COURSE, model);
    return res;
  },

  async updateCourses(model: Course, id: number): Promise<any> {
    const res = await apiConfig().patchRequest(`${ApiUrls.COURSE}/${id}`, model);
    return res;
  },

  async deleteCourses(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.COURSE}/${id}`);
    return res;
  },
};
