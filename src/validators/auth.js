import Validator from './validator.js'
import Joi from 'joi'

export default class AuthValidator extends Validator {
  login = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().required()
  })

  signup = Joi.object({
    lastname_user: Joi.string().max(50).required(),
    firstname_user: Joi.string().max(50).required(),
    birthdate_user: Joi.date().required(),
    email_user: Joi.string().email().required(),
    phone_user: Joi.string().min(10).max(10).required(),
    password_user: Joi.string().min(8).required(),
    cgu_user: Joi.boolean().required(),
    newsletter_user: Joi.boolean().required()
  })
}
