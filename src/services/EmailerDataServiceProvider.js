import http from "../http-common";

class EmailerDataService {
    getAll() {
        return http.post(`emailer`);
    }
}

export default new EmailerDataService();
