import http from "../http-common";

class RoleDataService {
  getAll() {
    return http.get(`roles`);
  }
  get(id) {
    return http.get(`/roles/${id}`);
  }
}

export default new RoleDataService();
