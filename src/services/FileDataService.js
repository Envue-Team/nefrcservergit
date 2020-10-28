/* eslint-disable no-mixed-spaces-and-tabs */
import http from "../http-common";

class FileDataService {
  // getAll() {
  //   return http.get(`files`);
  // }

  getAll(organizationId){
    return http.get(`files/organization/${organizationId}`);
  }

  get(id) {
    return http.get(`/files/${id}`);
  }

  upload(formData) {
    return http.post(`/files`,formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  download(name, data){
	  return http.get(`/files/${name}`, data);
  }

  update(id, data) {
    return http.put(`/files/${id}`, data);
  }

  delete(id) {
    return http.delete(`/files/${id}`);
  }

  deleteAll() {
    return http.delete(`/files`);
  }

}

export default new FileDataService();
