import http from "../http-common";

class EmailerDataService {
    sendMail() {
        return http.post(`emailer`);
    }
}

export default new EmailerDataService();
