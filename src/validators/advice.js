import Validator from './validator.js'
import Joi from 'joi'

export default class AdviceValidator extends Validator {
  create = Joi.object({
    instructions_advice: Joi.string().max(255).required(),
    plant_id: Joi.string().max(100).required()
  })
}
