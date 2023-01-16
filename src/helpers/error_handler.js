import { HttpError } from '../globals/errors.js'
import ErrorService from '../services/error.js'
const ErrorServiceInstance = new ErrorService()

/**
 * Handle all errors.
 */
export async function handleError (err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json(err.json)
  }
  const error = err.message
  const stack = err.stack
  await ErrorServiceInstance.save({ error, stack })
  return res.status(500).json({
    message: "La plantation à l'air d'avoir un problème, nous nous en occupons !",
    error: err.message,
    stack: err.stack
  })
}

export default handleError
