import ApiLibros from '../api/libros.js'


class ControladorLibros {

    constructor() {
        this.apiLibros = new ApiLibros()
    }

    getLibros = async (req,res) => {
        const { estadoBuscado } = req.params
        res.json( await this.apiLibros.obtenerLibros(estadoBuscado) )
    }

    postLibro = async (req,res) => {
        const libro = req.body
        res.json(await this.apiLibros.guardarLibro(libro))
        //res.redirect('/')
    }

   getLibroNoApto = async (req,res) => {
        const { codigo } = req.params
        const estado = 'no-apto'

        res.json(await this.apiLibros.actualizarEstadoLibro(estado,codigo))
    }

    getLibroAlquilado = async (req,res) => {
        const { codigo } = req.params
        const estado = 'alquilado'

        res.json(await this.apiLibros.actualizarEstadoLibro(estado,codigo))
    }

    getLibroDisponible = async (req,res) => {
        const { codigo } = req.params
        const estado = 'disponible'
    
        res.json(await this.apiLibros.actualizarEstadoLibro(estado,codigo))
    }

    deleteLibro = async (req,res) => {
        const { codigo } = req.params
    
        res.json(await this.apiLibros.eliminarLibro(codigo))
    }
}

export default ControladorLibros