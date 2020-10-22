import http from "../http-common";

class OrganizationDataService {
  getAll() {
    return http.get(`organizations`);
  }

  get(id) {
    return http.get(`/oganizations/${id}`);
  }

  create(data) {
    return http.post("/organizations", data);
  }

  update(id, data) {
    return http.put(`/organizations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/organizations/${id}`);
  }

  deleteAll() {
    return http.delete(`/organizations`);
  }

//   findByName(name) {
//     return http.get(`/shelter?name=${name}`);
//   }
}

export default new OrganizationDataService();
