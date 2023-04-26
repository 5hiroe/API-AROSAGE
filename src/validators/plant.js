import Validator from './validator.js'
import Joi from 'joi'

export default class PlantValidator extends Validator {
  create = Joi.object({
    user_id: Joi.number().required(),
    name_plant: Joi.string().max(255).required(),
    instructions_plant: Joi.string().max(255).required(),
    type_plant: Joi.string().max(255).required(),
    status_plant: Joi.string().max(255).required()
  })
}
