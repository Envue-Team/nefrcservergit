import http from "../http-common";

class LineOfBusinessDataService {
    getAll() {
        return http.get(`lines_of_business`);
    }

    get(id) {
        return http.get(`/lines_of_business/${id}`);
    }

    getByName(name){
        return http.get(`/lines_of_business/name/${name}`);
    }

    create(data) {
        return http.post("/lines_of_business", data);
    }

    update(id, data) {
        return http.put(`/lines_of_business/${id}`, data);
    }

    delete(id) {
        return http.delete(`/lines_of_business/${id}`);
    }

    deleteAll() {
        return http.delete(`/counties`);
    }
}

export default new LineOfBusinessDataService();
