import { BaseService } from "@/shared/services/base.service.js";
import httpInstance from "@/shared/services/http.instance.js";
export class ClotheService extends BaseService {
    constructor() {
        super(import.meta.env.VITE_CLOTHES_ENDPOINT_PATH);
    }

    getByUserId(userId) {
        return httpInstance.get(`${this.resourceEndpoint}?usuario=${userId}`)
            .then(r => r.data)
            .catch(error => {
                console.error(`Error fetching clothes for user ID ${userId}`, error);
                return [];
            });
    }

    getByEstado(estado) {
        return httpInstance.get(`${this.resourceEndpoint}?estado=${estado}`)
            .then(r => r.data)
            .catch(error => {
                console.error(`Error fetching clothes by estado`, error);
                return [];
            });
    }

    getByName(name) {
        return httpInstance.get(`${this.resourceEndpoint}?nombre_like=${name}`)
            .then(r => r.data)
            .catch(error => {
                console.error(`Error fetching clothes by name`, error);
                return [];
            });
    }
    // Dentro de ClotheService

    update(clothe) {
        return super.update(clothe.id, clothe);
    }


}
