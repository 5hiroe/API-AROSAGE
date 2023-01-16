import Joi from 'joi'
import Validator from './validator.js'

export default class AuthValidator extends Validator {
    signup = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        birthdate: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string(),
        address: Joi.string().required(),
        picture: Joi.string()
    })

    login = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }) 
}