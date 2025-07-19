import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { ParamsType, Room } from "@types";

export const RoomService = {
  async getRooms(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.ROOM, params);
    return res;
  },
  async createRoom(model: Room) {
    const res = await apiConfig().postRequest(ApiUrls.ROOM, model);
    return res;
  },
  async updateRoom(model: Room, id: number): Promise<any> {
    const res = await apiConfig().patchRequest(`${ApiUrls.ROOM}/${id}`, model);
    return res;
  },
  async deleteRoom(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.ROOM}/${id}`);
    return res;
  },
};
