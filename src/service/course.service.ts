import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";

export const CoursService = {
  async getCourses() {
    const res = await apiConfig().getRequest(ApiUrls.COURSE);
    return res;
  },
};
