import http from "../http-common";

class RolePermissionDataService {
    getAll() {
        return http.get(`role_permissions`);
    }

    get(id) {
        return http.get(`/role_permissions/${id}`);
    }

    create(data) {
        return http.post("/role_permissions", data);
    }

    update(roleId, permissionId, data) {
        return http.put(`/role_permissions/${roleId}/${permissionId}`, data);
    }

    deleteRolePermission(roleId) {
        return http.delete(`/role_permissions/${roleId}`);
    }

    delete(roleId, permissionId) {
        return http.delete(`/role_permissions/${roleId}/${permissionId}`);
    }

    deleteAll() {
        return http.delete(`/role_permissions`);
    }
}

export default new RolePermissionDataService();
