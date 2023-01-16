import ErrorModel from '../models/error.js'

export default class ErrorService {
  /**
   * ErrorService is a singleton.
   */
  constructor () {
    if (ErrorService.instance instanceof ErrorService) {
      return ErrorService.instance
    }
    Object.freeze(this)
    ErrorService.instance = this
  }

  /**
   * Save error.
   */
  async save ({ error, stack }) {
    const errorModel = await new ErrorModel({ error, stack })
    await errorModel.save()
  }

  /**
   * Get all error.
   */
  async getAll () {
    const errors = await ErrorModel.find()
    return errors
  }
}
