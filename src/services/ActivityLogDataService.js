import http from "../http-common";

class ActivityLogDataService {
    getAll() {
        return http.get(`activity_logs`); 
    }

    create(data) {
        return http.post("/activity_logs", data);
    }
}
 
export default new ActivityLogDataService();
