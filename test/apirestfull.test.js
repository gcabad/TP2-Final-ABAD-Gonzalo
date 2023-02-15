import supertest from 'supertest';
const request = supertest('http://localhost:8080')

import {expect} from 'chai'
import generador from '../generador/libros.js'

describe('Test api restfull de libros', () => {
    describe('GET', () => {
        it('debería retornar un status 200', async () => {
            let response = await request.get('/api/libros')
            expect(response.status).to.eql(200)
        })
    })
     
    describe('POST', () => {
        it('debería agregar un libro a la lista', async () => {
            let libroGenerado = generador.get()
            console.log(libroGenerado)

            let response = await request.post('/api/libros').send(libroGenerado)
            expect(response.status).to.eql(200)

            const recibido = response.body
            expect(recibido).to.include.keys('codigo', 'titulo','autor', 'estado')
            expect(recibido.titulo).to.eql(libroGenerado.titulo)
            expect(recibido.autor).to.eql(libroGenerado.autor)
        })
    }) 

    describe('GET', () => {
        it('debería cambiar un libro de DISPONIBLE a ALQUILADO', async () => {
                let response = await request.get('/api/libros/no-apto/3')
                let libro = response.body
                expect(response.status).to.eql(200)
                expect(libro.estado).to.eql('no-apto')
        })
    }) 

    describe('GET', () => {
        it('debería cambiar un libro en cualquier estado a DISPONIBLE', async () => {
                let response = await request.get('/api/libros/disponible/1')
                let libro = response.body
                expect(response.status).to.eql(200)
                expect(libro.estado).to.eql('disponible')
        })
    }) 
})
