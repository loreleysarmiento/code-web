/**
 * @class Clothe
 * @description Represents a clothing item within the system
 */
export class Clothe {
    /**
     * Creates a new Clothe instance
     * @param {Object} params - The clothe initialization parameters
     * @param {string} [params.id=''] - Unique identifier
     * @param {string} [params.nombre=''] - Name of the clothe
     * @param {string} [params.descripcion=''] - Description of the clothe
     * @param {number} [params.precio=0] - Price of the clothe
     * @param {string} [params.tipo=''] - Type of the clothe (e.g., polo, pantalon)
     * @param {string} [params.talla=''] - Size of the clothe
     * @param {string} [params.color=''] - Color of the clothe
     * @param {number} [params.usuario=0] - ID of the user who owns the clothe
     * @param {string} [params.imagen=''] - Image URL of the clothe
     * @param {string[]} [params.categorias=[]] - Array of category IDs assigned to the clothe
     */
    constructor({
                    id = '',
                    nombre = '',
                    descripcion = '',
                    precio = 0,
                    tipo = '',
                    talla = '',
                    color = '',
                    usuario = 0,
                    imagen = '',
                    categorias = []
                }) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.tipo = tipo;
        this.talla = talla;
        this.color = color;
        this.usuario = usuario;
        this.imagen = imagen;
        this.categorias = categorias;
    }


}
