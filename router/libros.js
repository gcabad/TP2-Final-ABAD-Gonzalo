import express from 'express'
import ControladorLibros from '../controller/libros.js'


export class RouterLibros {
    constructor() {
        this.router = express.Router()
        this.controladorLibros = new ControladorLibros()
    }

    start() {
        /* GET Libro/s */
        this.router.get('/:estadoBuscado?', this.controladorLibros.getLibros)
        /* POST Libro */
        this.router.post('/', this.controladorLibros.postLibro)
        /* GET - Cambiar libro a no-apto */
        this.router.get('/no-apto/:codigo', this.controladorLibros.getLibroNoApto)
        /* GET - Cambiar libro a alquilado */
        this.router.get('/alquilado/:codigo', this.controladorLibros.getLibroAlquilado)
        /* GET - Cambiar libro a disponible */
        this.router.get('/disponible/:codigo', this.controladorLibros.getLibroDisponible)
        /* DELETE Libro */
        this.router.delete('/:codigo', this.controladorLibros.deleteLibro)

        return this.router
    }
}
