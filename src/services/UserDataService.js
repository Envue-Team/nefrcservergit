import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get(`users`);
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  getByEmail(email) {
    return http.get(`/users/email/${email}`);
  }

  create(data) {
    return http.post("/users", data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

}

export default new UserDataService();
