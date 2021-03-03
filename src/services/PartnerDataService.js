import http from "../http-common";

class PartnerDataService {
  getAll() {
    return http.get(`partners`);
  }

  get(id) {
    return http.get(`/partners/${id}`);
  }

  create(data) {
    return http.post("/partners", data);
  }

  update(id, data) {
    return http.put(`/partners/${id}`, data);
  }

  delete(id) {
    return http.delete(`/partners/${id}`);
  }

  deleteAll() {
    return http.delete(`/partners`);
  }
}

export default new PartnerDataService();
