import http from "../http-common";

class UserRoleDataService {

  create(data) {
    return http.post(`/user_roles/`, data);
  }
  update(userId, data) {
    return http.put(`/user_roles/${userId}`, data);
  }
  get(userId, data) {
    return http.get(`/user_roles/${userId}`, data);
  }

}

export default new UserRoleDataService();
