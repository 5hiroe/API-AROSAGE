import { HttpError } from '../globals/errors.js'

/**
 * Handle all errors.
 */
export async function handleError (err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json(err.json)
  }
  const error = err.message
  const stack = err.stack
  return res.status(500).json({
    message: "La plantation à l'air d'avoir un problème... Nous nous en occupons !",
    error,
    stack
  })
}

export default handleError
