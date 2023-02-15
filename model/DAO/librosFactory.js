import LibrosMemoriaDAO from './librosMemoria.js'

class LibrosFactoryDAO {
    static get(tipo) {
        switch(tipo) {
            case 'MEMORIA' :
                console.log(' ***** Persistiendo en Memoria ***** ')
                return new LibrosMemoriaDAO()

            default: 
                console.log(' ***** Persistiendo en default (Memoria) ***** ')
                return new LibrosMemoriaDAO()
        }
    }
}

export default LibrosFactoryDAO