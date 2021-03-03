import http from "../http-common";

class ArcRelationshipDataService {
    getAll() {
        return http.get(`arc_relationships`);
    }

    get(id) {
        return http.get(`/arc_relationships/${id}`);
    }

    getByName(name){
        return http.get(`/arc_relationships/name/${name}`);
    }

    create(data) {
        return http.post("/arc_relationships", data);
    }

    update(id, data) {
        return http.put(`/arc_relationships/${id}`, data);
    }

    delete(id) {
        return http.delete(`/arc_relationships/${id}`);
    }

    deleteAll() {
        return http.delete(`/arc_relationships`);
    }
}

export default new ArcRelationshipDataService();
