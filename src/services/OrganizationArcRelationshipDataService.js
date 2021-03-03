import http from "../http-common";

class OrganizationArcRelationshipDataService {
    getAll() {
        return http.get(`organization_arc_relationships`);
    }

    get(id) {
        return http.get(`/organization_arc_relationships/${id}`);
    }

    create(data) {
        return http.post("/organization_arc_relationships", data);
    }

    update(organizationId, arcRelationshipId, data) {
        return http.put(`/organization_arc_relationships/${organizationId}/${arcRelationshipId}`, data);
    }

    deleteOrganizationArcRelationships(organizationId) {
        return http.delete(`/organization_arc_relationships/${organizationId}`);
    }

    delete(organizationId, arcRelationshipId) {
        return http.delete(`/organization_arc_relationships/${organizationId}/${arcRelationshipId}`);
    }

    deleteAll() {
        return http.delete(`/organization_arc_relationships`);
    }
}

export default new OrganizationArcRelationshipDataService();
