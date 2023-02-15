class LibrosMemDAO {

    constructor() {
        this.libros = [
            { codigo: '1', titulo: 'Rant', autor: 'Chuck Palahniuk', estado: "alquilado" },
            { codigo: '2', titulo: '¿Sueñan los androides con ovejas eléctricas?', autor: 'Philip Dick', estado: "disponible" },
            { codigo: '3', titulo: 'Metro 2033', autor: 'Dmitri Glujovski', estado: "disponible" },
            { codigo: '4', titulo: 'El visitante', autor: 'Stephen King', estado: "no-apto" },
        ]
    }

    //delay = ms => new Promise(resolve => setTimeout(resolve,ms))

    findLibro = async codigo => {
        return await Promise.resolve(this.libros.find(libro => libro.codigo == codigo))    
    }

    findLibros = async ()  => {
        try {
            //await delay(2000)
            return await Promise.resolve(this.libros)
        }
        //catch(err) {
        catch {
            return []
        }
    }

    saveLibro = async libro => {
        const codigo = this.libros.length ? parseInt(this.libros[this.libros.length-1].codigo) + 1 : 1
        libro.codigo = String(codigo)

        this.libros.push(libro)

        return await Promise.resolve(libro)
    }

    updateLibro = async (libro, codigo) => {
        /* Actualización total */    
        libro.codigo = codigo
        const index = this.libros.findIndex(libro => libro.codigo == codigo)
        this.libros.splice(index, 1, libro)

        return await Promise.resolve(libro)
    }


    deleteLibro = async codigo => {
        const index = this.libros.findIndex(libro => libro.codigo == codigo)
        //(1)
        //const cliente = Libros[index]
        //Libros.splice(index, 1)       

        //(2)
        const cliente = this.libros.splice(index, 1)[0]
        
        return await Promise.resolve(libro)
    }
}

export default LibrosMemDAO
