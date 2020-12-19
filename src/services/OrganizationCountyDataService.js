import http from "../http-common";

class OrganizationContactDataService {
    getAll() {
        return http.get(`organization_counties`);
    }

    get(id) {
        return http.get(`/organization_counties/${id}`);
    }

    create(data) {
        return http.post("/organization_counties", data);
    }

    update(organizationId, countyId, data) {
        return http.put(`/organization_counties/${organizationId}/${countyId}`, data);
    }

    deleteOrganizationCounties(organizationId) {
        return http.delete(`/organization_counties/${organizationId}`);
    }

    delete(organizationId, countyId) {
        return http.delete(`/organization_counties/${organizationId}/${countyId}`);
    }

    deleteAll() {
        return http.delete(`/organization_counties`);
    }
}

export default new OrganizationContactDataService();
