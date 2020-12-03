import http from "../http-common";

class PointOfContactDataService {
    getAll(organizationId) {
        return http.get(`pocs/${organizationId}`);
    }

    create(data) {
        return http.post("/pocs", data);
    }

    update(organizationId, personId, data) {
        return http.put(`/pocs/${organizationId}/${personId}`, data);
    }

    delete(organizationId, personId) {
        return http.delete(`/pocs/${organizationId}/${personId}`);
    }

    deleteAll(organizationId) {
        return http.delete(`/pocs/${organizationId}`);
    }
}

export default new PointOfContactDataService();
