import KeepService from '../services/keep.js'
import KeepValidator from '../validators/keep.js'
const KeepServiceInstance = new KeepService()
const KeepValidatorInstance = new KeepValidator()

export async function createKeep (req, res) {
  const fields = req.body
  await KeepValidatorInstance.validate(req.body, KeepValidatorInstance.create)
  const keep = await KeepServiceInstance.createKeep({ fields })
  res.status(200).json({ message: 'Votre demande de garde a bien été enregistrée.', keep })
}
