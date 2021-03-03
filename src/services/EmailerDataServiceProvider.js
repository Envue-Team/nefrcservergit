import http from "../http-common";

class EmailerDataService {
    sendMail(data) {
        return http.post(`emailer`, data);
    }
}

export default new EmailerDataService();