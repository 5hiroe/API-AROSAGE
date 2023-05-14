import PlantService from '../services/plant.js'
import PlantValidator from '../validators/plant.js'
const PlantServiceInstance = new PlantService()
const PlantValidatorInstance = new PlantValidator()

export async function createPlant (req, res) {
  console.log('inController')
  const fields = req.body
  console.log(fields)
  const userId = req.jwt.data.id
  console.log(userId)
  await PlantValidatorInstance.validate(fields, PlantValidatorInstance.createPlant)
  const plant = await PlantServiceInstance.createPlant({ fields, userId })
  res.status(200).json({ message: 'La plante a été créée', plant })
}

export async function getPlantById (req, res) {
  const { id } = req.params
  const plant = await PlantServiceInstance.getPlantById(id)
  res.status(200).json({
    message: 'La plante a été récupérée.',
    plant
  })
}

export async function putPlantById (req, res) {
  const { id } = req.params
  const fields = req.body
  const userId = req.jwt.data.id
  const plant = await PlantServiceInstance.putPlantById({ fields, id, userId })
  res.status(200).json({
    message: 'La plante a été mise à jour.',
    plant
  })
}

export async function deletePlantById (req, res) {
  const { id } = req.params
  const userId = req.jwt.data.id
  await PlantServiceInstance.deletePlantById({ id, userId })
  res.status(200).json({ message: 'La plante a été supprimée.' })
}

export async function getAllPlantByUserId (req, res) {
  const { id } = req.jwt.data
  const plants = await PlantServiceInstance.getAllPlantByUserId({ id })
  res.status(200).json({
    message: 'Les plantes ont été récupérées.',
    plants
  })
}
