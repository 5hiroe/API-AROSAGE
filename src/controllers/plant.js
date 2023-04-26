import PlantService from '../services/plant.js'
import PlantValidator from '../validators/plant.js'
const PlantServiceInstance = new PlantService()
const PlantValidatorInstance = new PlantValidator()

export async function create (req, res) {
  const fields = req.body
  await PlantValidatorInstance.validate(req.body, PlantValidatorInstance.create)
  await PlantServiceInstance.createPlant({ fields })
  res.status(200).json('La plante est bien enregistrée')
}
