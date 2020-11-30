import http from "../http-common";

class UserRoleDataService {

  update(userId, data) {
    return http.put(`/user_roles/${userId}`, data);
  }

}

export default new UserRoleDataService();
