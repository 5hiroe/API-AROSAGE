import KeepService from '../services/keep.js'
import KeepValidator from '../validators/keep.js'
const KeepServiceInstance = new KeepService()
const KeepValidatorInstance = new KeepValidator()

export async function createKeep (req, res) {
  const fields = req.body
  await KeepValidatorInstance.validate(req.body, KeepValidatorInstance.signup)
  await KeepServiceInstance.createKeep({ fields })
  res.status(200).json('La garde a bien été créée')
}
