import AuthService from '../services/auth.js'
import AuthValidator from '../validators/auth.js'
import LocationService from '../services/location.js'
const AuthServiceInstance = new AuthService()
const AuthValidatorInstance = new AuthValidator()
const LocationServiceInstance = new LocationService()

export async function signup (req, res) {
  const fields = req.body
  await AuthValidatorInstance.validate(req.body, AuthValidatorInstance.signup)
  const jwt = await AuthServiceInstance.signup({ fields })
  res.status(200).json({ jwt: jwt.jwt, id: jwt.id.toString() })
}

export async function login (req, res) {
  const { email, password } = req.body
  await AuthValidatorInstance.validate(req.body, AuthValidatorInstance.login)
  const jwt = await AuthServiceInstance.login({ email, password })
  console.log(jwt)
  res.status(200).json({ jwt: jwt.jwt, id: jwt.id.toString() })
}

export async function getUser (req, res) {
  const { id } = req.jwt.data
  const user = await AuthServiceInstance.getUser({ id })
  res.status(200).json({ message: 'Utilisateur récupéré', user })
}

export async function getLocations (req, res) {
  const locations = await LocationServiceInstance.getAllLocations()
  res.status(200).json({ message: 'Adresses récupérées', locations })
}

export async function logout (req, res) {
  const { id } = req.jwt.data
  const jwt = await AuthServiceInstance.logout({ id })
  res.status(200).json({ message: 'Utilisateur déconnecté', jwt })
}
