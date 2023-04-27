import PlantService from '../services/plant.js'
import PlantValidator from '../validators/plant.js'
const PlantServiceInstance = new PlantService()
const PlantValidatorInstance = new PlantValidator()

export async function createPlant (req, res) {
  const fields = req.body
  await PlantValidatorInstance.validate(fields, PlantValidatorInstance.createPlant)
  await PlantServiceInstance.createPlant({ fields })
  res.status(200).json('La plante est bien enregistrée')
}

export async function getPlantById (req, res) {
  const { id } = req.params
  const plant = await PlantServiceInstance.getPlantById(id)
  res.status(200).json({
    message: `Récupération de la plante à l'id : ${plant.plant_id}`,
    plant
  })
}

export async function putPlantById (req, res) {
  const { id } = req.params
  const fields = req.body
  const plant = await PlantServiceInstance.putPlantById({ fields, id })
  res.status(200).json({
    message: `La plante à l'id : ${plant.plant_id} a été mise à jour.`,
    plant
  })
}

export async function deletePlantById (req, res) {
  const { id } = req.params
  console.log(id)
  const plant = await PlantServiceInstance.deletePlantById(id)
  res.status(200).json({
    message: 'La plante a été supprimé.',
    plant
  })
}
