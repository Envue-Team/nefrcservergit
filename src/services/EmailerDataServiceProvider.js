import http from "../http-common";

class EmailerDataService {
    getAll(data) {
        return http.post(`emailer`, data);
    }
}

export default new EmailerDataService();