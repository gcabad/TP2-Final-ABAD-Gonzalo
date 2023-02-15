import Joi from 'joi'

const validarPost = libro => {
    const libroSchema = Joi.object({
        titulo: Joi.string().required(),
        autor: Joi.string().required(),
    })

    const { error } = libroSchema.validate(libro)
    if(error) {
        return { result: false, error }
    }
    else {
        
        return { result: true }
    }
}

const validarEstado = libro => {
    const estadoSchema = Joi.object({
        estado: Joi.string().valid('disponible', 'alquilado', 'no-apto').required()
    })

    const { error } = validarEstado.validate(libro)
    if(error) {
        return { result: false, error }
    }
    else {
        return { result: true }
    }
}

export default {
    validarPost,
    validarEstado
}
