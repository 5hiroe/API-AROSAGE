import KeepService from '../services/keep.js'
import KeepValidator from '../validators/keep.js'
const KeepServiceInstance = new KeepService()
const KeepValidatorInstance = new KeepValidator()

export async function createKeep (req, res) {
  const fields = req.body
  const userId = req.jwt.data.id
  await KeepValidatorInstance.validate(req.body, KeepValidatorInstance.create)
  const keep = await KeepServiceInstance.createKeep({ fields, userId })
  res.status(200).json({ message: 'Votre demande de garde a bien été enregistrée.', keep })
}

export async function getKeepByUser (req, res) {
  const { id } = req.jwt.data
  const keeps = await KeepServiceInstance.getKeepByUser({ id })
  res.status(200).json({
    message: 'Les gardes ont été récupérées.',
    keeps
  })
}
