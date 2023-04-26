import PlantService from '../services/plant.js'
import PlantValidator from '../validators/plant.js'
const PlantServiceInstance = new PlantService()
const PlantValidatorInstance = new PlantValidator()

export async function createPlant (req, res) {
  const fields = req.body
  await PlantValidatorInstance.validate(req.body, PlantValidatorInstance.create)
  await PlantServiceInstance.createPlant({ fields })
  res.status(200).json('La plante est bien enregistrée')
}

export async function getPlantById (req, res) {
  // chopper le truc
  console.log(req.params.id)
  const { id } = req.params
  const plant = await PlantServiceInstance.getPlantById(id)
  res.status(200).json({
    message: `Récupération de la plante à l'id : ${plant.plant_id}`,
    plant
  })
}
