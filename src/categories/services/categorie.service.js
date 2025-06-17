import httpInstance from "../../shared/services/http.instance.js";
import { BaseService } from "@/shared/services/base.service.js";

export class CategoryService extends BaseService {
    constructor() {
        super(import.meta.env.VITE_CATEGORIES_ENDPOINT_PATH);
    }


}

