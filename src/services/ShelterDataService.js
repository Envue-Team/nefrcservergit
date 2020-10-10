import http from "../http-common";

class shelterDataService {
  getAll() {
    return http.get(`shelters`);
  }

  get(id) {
    return http.get(`/shelters/${id}`);
  }

  create(data) {
    return http.post("/shelters", data);
  }

  update(id, data) {
    return http.put(`/shelters/${id}`, data);
  }

  delete(id) {
    return http.delete(`/shelters/${id}`);
  }

  deleteAll() {
    return http.delete(`/shelters`);
  }

  findByName(name) {
    return http.get(`/shelter?name=${name}`);
  }
}

export default new shelterDataService();
