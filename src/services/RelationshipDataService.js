import http from "../http-common";

class RelationshipDataService {
  getAll() {
    return http.get(`relationships`);
  }

  get(id) {
    return http.get(`/relationships/${id}`);
  }

  create(data) {
    return http.post("/relationships", data);
  }

  update(id, data) {
    return http.put(`/relationships/${id}`, data);
  }

  delete(id) {
    return http.delete(`/relationships/${id}`);
  }

  deleteAll() {
    return http.delete(`/relationshipss`);
  }
}

export default new RelationshipDataService();