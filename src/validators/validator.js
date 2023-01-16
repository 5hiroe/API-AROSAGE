import { BadRequest } from '../globals/errors.js'

export default class Validator {
  validate (body, schema) {
    const { value, error } = schema.validate(body, { abortEarly: false })
    if (error) {
      const errors = []
      for (const detail of error.details) {
        errors.push(detail.message)
      }
      throw new BadRequest({ errors })
    }
    return value
  }
}