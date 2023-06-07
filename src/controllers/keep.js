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

export async function getKeepById (req, res) {
  const { id } = req.params
  const keep = await KeepServiceInstance.getKeepById({ id })
  res.status(200).json({
    message: 'La garde a été récupérée.',
    keep
  })
}

export async function getAllKeeps (req, res) {
  const keeps = await KeepServiceInstance.getAllKeeps()
  res.status(200).json({
    message: 'Les gardes ont été récupérées.',
    keeps
  })
}

export async function applyKeep (req, res) {
  const { id } = req.params
  const { id: userId } = req.jwt.data
  const keep = await KeepServiceInstance.applyKeep({ id, userId })
  res.status(200).json({
    message: 'Vous avez postulé à la garde.',
    keep
  })
}

export async function appliedKeeps (req, res) {
  const { id } = req.jwt.data
  const keeps = await KeepServiceInstance.getAllAppliedKeeps({ id })
  res.status(200).json({
    message: 'Les gardes ont été récupérées.',
    keeps
  })
}

export async function getAllKeepsExceptUser (req, res) {
  const { id } = req.jwt.data
  const keeps = await KeepServiceInstance.getAllKeepsExceptUser({ id })
  res.status(200).json({
    message: 'Les gardes ont été récupérées.',
    keeps
  })
}
