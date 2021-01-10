import http from "../http-common";

class OrganizationAgencyTypeDataService {
    getAll() {
        return http.get(`organization_agency_types`);
    }

    get(id) {
        return http.get(`/organization_agency_types/${id}`);
    }

    create(data) {
        return http.post("/organization_agency_types", data);
    }

    update(organizationId, agencyTypeId, data) {
        return http.put(`/organization_agency_types/${organizationId}/${agencyTypeId}`, data);
    }

    deleteOrganizationAgencyTypes(organizationId) {
        return http.delete(`/organization_agency_types/${organizationId}`);
    }

    delete(organizationId, agencyTypeId) {
        return http.delete(`/organization_counties/${organizationId}/${agencyTypeId}`);
    }

    deleteAll() {
        return http.delete(`/organization_agency_types`);
    }
}

export default new OrganizationAgencyTypeDataService();
