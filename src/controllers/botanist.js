import BotanistService from '../services/botanist.js'
import BotanistValidator from '../validators/botanist.js'
import LocationService from '../services/location.js'
const BotanistServiceInstance = new BotanistService()
const BotanistValidatorInstance = new BotanistValidator()
const LocationServiceInstance = new LocationService()

export async function signup (req, res) {
  const fields = req.body
  await BotanistValidatorInstance.validate(req.body, BotanistValidatorInstance.signup)
  const jwt = await BotanistServiceInstance.signup({ fields })
  res.status(200).json({ jwt })
}

export async function login (req, res) {
  const { email, password } = req.body
  await BotanistValidatorInstance.validate(req.body, BotanistValidatorInstance.login)
  const jwt = await BotanistServiceInstance.login({ email, password })
  res.status(200).json({ jwt })
}

export async function getBotanist (req, res) {
  const { id } = req.jwt.data
  const user = await BotanistServiceInstance.getBotanist({ id })
  res.status(200).json({ message: 'Botaniste récupéré', user })
}

export async function getLocations (req, res) {
  const locations = await LocationServiceInstance.getAllLocations()
  res.status(200).json({ message: 'Adresses récupérées', locations })
}
