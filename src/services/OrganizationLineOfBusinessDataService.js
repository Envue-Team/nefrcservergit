import http from "../http-common";

class OrganizationLineOfBusinessDataService {
    getAll() {
        return http.get(`organization_lines_of_business`);
    }

    get(id) {
        return http.get(`/organization_lines_of_business/${id}`);
    }

    create(data) {
        return http.post("/organization_lines_of_business", data);
    }

    update(organizationId, lobId, data) {
        return http.put(`/organization_lines_of_business/${organizationId}/${lobId}`, data);
    }

    deleteOrganizationLinesOfBusiness(organizationId) {
        return http.delete(`/organization_lines_of_business/${organizationId}`);
    }

    delete(organizationId, lobId) {
        return http.delete(`/organization_lines_of_business/${organizationId}/${lobId}`);
    }

    deleteAll() {
        return http.delete(`/organization_lines_of_business`);
    }
}

export default new OrganizationLineOfBusinessDataService();
