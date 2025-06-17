import httpInstance from "@/shared/services/http.instance.js";

export class BaseService {
    constructor(resourceEndpoint) {
        this.resourceEndpoint = resourceEndpoint;
    }

    getAll() {
        return httpInstance.get(this.resourceEndpoint)
            .then(r => r.data)
            .catch(error => {
                console.error(`Error fetching all from ${this.resourceEndpoint}`, error);
                return [];
            });
    }

    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}?id=${id}`)
            .then(r => Array.isArray(r.data) ? r.data[0] : r.data)
            .catch(error => {
                console.error(`Error fetching by ID from ${this.resourceEndpoint}`, error);
                return null;
            });
    }

    create(resource) {
        return httpInstance.post(this.resourceEndpoint, resource)
            .then(r => r.data)
            .catch(error => {
                console.error(`Error creating in ${this.resourceEndpoint}`, error);
                return null;
            });
    }

    update(id, resource) {
        return httpInstance.put(`${this.resourceEndpoint}/${id}`, resource)
            .then(r => r.data)
            .catch(error => {
                console.error(`Error updating in ${this.resourceEndpoint}`, error);
                return null;
            });
    }

    delete(id) {
        return httpInstance.delete(`${this.resourceEndpoint}/${id}`)
            .then(r => r.data)
            .catch(error => {
                console.error(`Error deleting in ${this.resourceEndpoint}`, error);
                return null;
            });
    }
}
