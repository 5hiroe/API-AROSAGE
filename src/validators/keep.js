import Validator from './validator.js'
import Joi from 'joi'

export default class KeepValidator extends Validator {
  create = Joi.object({
    start_date_keep: Joi.date().required(),
    end_date_keep: Joi.date().required(),
    instruction_keep: Joi.string().max(255).required(),
    plants: Joi.array().items(Joi.number().required()).min(1).required(),
    address1: Joi.string().max(255),
    address2: Joi.string().max(255),
    city: Joi.string().max(255).required(),
    postal_code: Joi.string().max(255)
  })
}
