import express from 'express'
import { RouterLibros } from './router/libros.js'

class Server {
    constructor(port) {
        this.app = express()
        this.port = port
    }

    async start() {
        this.app.use(express.static('public'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        
        this.app.use('/api/libros', new RouterLibros().start())

        this.server = this.app.listen(this.port, () => console.log(`Servidor express escuchando en el puerto ${this.port}`))
        this.server.on('error', error => console.log(`Error en servidor: ${error.message}`))

        return this.app
    }
    
}

export default Server