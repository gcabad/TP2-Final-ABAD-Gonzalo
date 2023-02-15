import LibrosFactoryDAO from '../model/DAO/librosFactory.js'
import validaciones from '../validaciones/libros.js'
import config from '../config.js'
import request from 'request'


class ApiLibros {
    constructor() {
        this.librosModel = LibrosFactoryDAO.get(config.MODO_PERSISTENCIA)
    }

    obtenerLibros = async estadoBuscado => {
        let libros = await this.librosModel.findLibros()
        if(estadoBuscado) {
            let resultado = []
            libros.forEach(libro => {
                if(libro.estado == estadoBuscado) {
                    resultado.push(libro)
                }
            })
            return resultado
        }
        else {
            return libros
        }        
    }


    guardarLibro = async libro => {
        let val = validaciones.validarPost(libro)
        if(val.result) {
            libro.estado = 'disponible'
            return await this.librosModel.saveLibro(libro)
        }
        else {
            return val.error
        }
    }

    actualizarEstadoLibro = async (estado,codigo) => {
        let libro = await this.librosModel.findLibro(codigo)
        switch(estado) {
            case 'no-apto' :
                /* Se entiende que un libro puede pasar a ser no apto ya sea porque se rompe o arruina en la biblioteca, tanto como que se le rompa a un
                cliente y este lo devuleva en estado no apto. Por ende no es necesario pasar el libro de alquilado a disponible y luego a no-apto. El libro puede pasar
                a no-apto directamente dadas las condiciones que el cliente lo devuelva. */
                if(libro.estado != 'no-apto')
                {
                    libro.estado = estado
                    return await this.librosModel.updateLibro(libro,codigo)
                }
                else{
                    return {errorMsg: "El libro ya se encuentra en estado no-apto"}
                }
            case 'disponible' :
                /* Se entiende que un libro puede pasar a estar disponible ya sea porque el cliente lo devuelve o porque se repara un libro en estado no-apto */
                if(libro.estado != 'disponible')
                {
                    libro.estado = estado
                    return await this.librosModel.updateLibro(libro,codigo)
                }   
                else{
                    return {errorMsg: "El libro ya se encuentra en estado disponible"}
                }
            case 'alquilado' :
                /* Se entiende que un libro puede pasar a estar alquilado solamente si el libro este en estado "disponible" */
                if(libro.estado == 'disponible')
                {
                    libro.estado = estado
                    let resultadoSorteo = this.consultarSorteo()
                    if(resultadoSorteo.premio) 
                    {
                        await this.librosModel.deleteLibro(codigo)
                        console.log("Usted ha ganado el sorteo!")
                        return {mensaje: `Ha ganado el sorteo del libro ${libro.titulo} del autor ${libro.autor}`}
                    }
                    else {
                        console.log(`No ha ganado el sorteo... mejor suerte la proxima.`)
                        return await this.librosModel.updateLibro(libro,codigo)
                    }
                }
                else
                {
                    return { errorMsg: `El libro no se puede alquilar ya que esta en estado ${libro.estado}`}
                }
            default: 
                return { errorMsg: `Error no definido.`}
        }
    }

    eliminarLibro = async codigo => {
        return await this.librosModel.deleteLibro(codigo)
    }

    consultarSorteo = async _ => {
        let body
        request('https://libros.deno.dev/premios', (error, response, body) => {
            body = JSON.parse(body)
        })
        return body
    }

}

export default ApiLibros