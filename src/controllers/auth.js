import AuthService from '../services/auth.js'
import AuthValidator from '../validators/auth.js'
const AuthServiceInstance = new AuthService()
const AuthValidatorInstance = new AuthValidator()

export async function signup(req, res) {
  const fields = req.body
  await AuthValidatorInstance.validate(req.body, AuthValidatorInstance.signup)
  const jwt = await AuthServiceInstance.signup({ fields })
  res.status(200).json({ jwt })
}

export async function login(req, res) {
  const { email, password } = req.body
  await AuthValidatorInstance.validate(req.body, AuthValidatorInstance.login)
  const jwt = await AuthServiceInstance.login({ email, password })
  res.status(200).json({ jwt })
}