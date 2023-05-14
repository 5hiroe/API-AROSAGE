import Validator from './validator.js'
import Joi from 'joi'

export default class BotanistValidator extends Validator {
  login = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().required()
  })

  signup = Joi.object({
    lastname_botanist: Joi.string().max(50).required(),
    firstname_botanist: Joi.string().max(50).required(),
    birthdate_botanist: Joi.date().required(),
    email_botanist: Joi.string().email().required(),
    phone_botanist: Joi.string().min(10).max(10).required(),
    password_botanist: Joi.string().min(8).required()
  })
}
