import http from "../http-common";

class AgencyTypeDataService {
    getAll() {
        return http.get(`agency_types`);
    }

    get(id) {
        return http.get(`/agency_types/${id}`);
    }

    getByName(name){
        return http.get(`/agency_types/name/${name}`);
    }

    create(data) {
        return http.post("/agency_types", data);
    }

    update(id, data) {
        return http.put(`/counties/${id}`, data);
    }

    delete(id) {
        return http.delete(`/agency_types/${id}`);
    }

    deleteAll() {
        return http.delete(`/agency_types`);
    }
}

export default new AgencyTypeDataService();
