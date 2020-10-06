import http from "../http-common";

class DataService {
  getAll() {
    return http.get(`volunteers`);
  }

  get(id) {
    return http.get(`/volunteers/${id}`);
  }

  create(data) {
    return http.post("/volunteers", data);
  }

  update(id, data) {
    return http.put(`/volunteers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/volunteers/${id}`);
  }

  deleteAll() {
    return http.delete(`/volunteers`);
  }

  findByName(name) {
    return http.get(`/volunteer?name=${name}`);
  }
}

export default new DataService();
