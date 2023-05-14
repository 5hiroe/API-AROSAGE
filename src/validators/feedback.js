import Validator from './validator.js'
import Joi from 'joi'

export default class FeedbackValidator extends Validator {
  create = Joi.object({
    instructions_feedback: Joi.string().max(255).required(),
    keep_id: Joi.number().required()
  })
}
