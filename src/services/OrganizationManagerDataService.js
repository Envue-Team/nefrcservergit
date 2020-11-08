import http from "../http-common";

class OrganizationManagerDataService {
  getAll() {
    return http.get(`relationship_managers`);
  }

  get(id) {
    return http.get(`/relationship_managers/${id}`);
  }

  create(data) {
    return http.post("/relationship_managers", data);
  }

  update(organizationId, personId, data) {
    return http.put(`/relationship_managers/${organizationId}/${personId}`, data);
  }

  delete(organizationId, personId) {
    return http.delete(`/relationship_managers/${organizationId}/${personId}`);
  }

  deleteAll() {
    return http.delete(`/relationship_managers`);
  }
}

export default new OrganizationManagerDataService();
