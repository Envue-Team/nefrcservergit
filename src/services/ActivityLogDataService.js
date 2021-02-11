import http from "../http-common";

class ActivityLogDataService {
    getAll() {
        return http.get(`activity_log`);
    }

    create(data) {
        return http.post("/activity_log", data);
    }
}
 
export default new ActivityLogDataService();
