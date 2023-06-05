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
  res.status(200).json({ jwt })
}

export async function login (req, res) {
  const { email, password } = req.body
  await AuthValidatorInstance.validate(req.body, AuthValidatorInstance.login)
  const jwt = await AuthServiceInstance.login({ email, password })
  res.status(200).json({ jwt })
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

export async function updateUser (req, res) {
  const fields = req.body
  const { id } = req.jwt.data
  await AuthValidatorInstance.validate(req.body, AuthValidatorInstance.putUser)
  const user = await AuthServiceInstance.updateUser({ fields, id })
  res.status(200).json({ message: 'Utilisateur mis à jour', user })
}

export async function deleteUser (req, res) {
  const { id } = req.jwt.data
  await AuthServiceInstance.deleteUser({ id })
  res.status(200).json({ message: 'Utilisateur supprimé' })
}
