import Validator from './validator.js'
import Joi from 'joi'

export default class KeepValidator extends Validator {
  keep = Joi.object({
    start_date_keep: Joi.date().required(),
    end_date_keep: Joi.date().required(),
    status_keep: Joi.string().max(50).required(),
    instruction_keep: Joi.string().max(255).required()
  })
}
