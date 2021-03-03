import http from "../http-common";

class EmailDataService {
  getAll() {
    return http.get(`emails`);
  }

  get(id) {
    return http.get(`/emails/${id}`);
  }

  create(data) {
    return http.post(`/emails`, data);
  }

  update(id, data) {
    return http.put(`/emails/${id}`, data);
  }

  delete(id) {
    return http.delete(`/emails/${id}`);
  }

  deleteAll() {
    return http.delete(`/emails`);
  }

}

export default new EmailDataService();
