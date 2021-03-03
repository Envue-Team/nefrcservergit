import http from "../http-common";

class PhoneDataService {
  getAll() {
    return http.get(`phones`);
  }

  get(id) {
    return http.get(`/phones/${id}`);
  }

  create(data) {
    return http.post("/phones", data);
  }

  update(id, data) {
    return http.put(`/phones/${id}`, data);
  }

  delete(id) {
    return http.delete(`/phones/${id}`);
  }

  deleteAll() {
    return http.delete(`/phones`);
  }

}

export default new PhoneDataService();
