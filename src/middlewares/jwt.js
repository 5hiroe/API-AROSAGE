import JsonWebToken from 'jsonwebtoken'
import { Forbidden } from '../globals/errors.js'
import JWTService from '../services/jwt.js'
const JWTServiceInstance = new JWTService()

function _getJWT (req) {
  const bearerHeader = req.headers.authorization
  if (!bearerHeader) {
    throw new Forbidden('JWT inexistant.')
  }
  const jwt = bearerHeader.split(' ')[1]
  return jwt
}

export function verify (req, res, next) {
  const jwt = _getJWT(req)
  let data
  try {
    data = JsonWebToken.verify(jwt, process.env.JWT)
  } catch (_) {
    throw new Forbidden('JWT invalide.')
  }
  req.jwt = {
    jwt,
    data
  }

  if (process.env.DEBUG !== 'true') {
    if (!JWTServiceInstance.contain(jwt)) {
      throw new Forbidden('Session expirée.')
    }
  }

  next()
}
