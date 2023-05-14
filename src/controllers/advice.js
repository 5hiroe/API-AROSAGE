import AdviceService from '../services/advice.js'
import AdviceValidator from '../validators/advice.js'
const AdviceServiceInstance = new AdviceService()
const AdviceValidatorInstance = new AdviceValidator()

export async function create (req, res) {
  const fields = req.body
  const { id } = req.jwt.data
  AdviceValidatorInstance.validate(req.body, AdviceValidatorInstance.create)
  const advice = await AdviceServiceInstance.create({ fields, id })
  return res.status(200).json({ message: 'Conseil créé avec succès.', advice })
}

export async function findAllByPlant (req, res) {
  const { id } = req.params
  const advices = await AdviceServiceInstance.findAllByPlant({ id })
  return res.status(200).json({ message: 'Liste des conseils récupérée avec succès.', advices })
}
