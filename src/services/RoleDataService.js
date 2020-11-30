import http from "../http-common";

class RoleDataService {
  getAll() {
    return http.get(`roles`);
  }
}

export default new RoleDataService();
