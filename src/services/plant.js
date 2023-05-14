import { NotFound, Unauthorized } from '../globals/errors.js'
import { AVAILABLE } from '../globals/keep_status.js'
import { Plant } from '../models/plant.js'
import { Picture } from '../models/picture.js'

export default class PlantService {
  constructor () {
    if (PlantService.instance instanceof PlantService) {
      return PlantService.instance
    }
    Object.freeze(this)
    PlantService.instance = this
  }

  async createPlant ({ fields, userId }) {
    fields.user_id = userId
    fields.status_plant = AVAILABLE
    console.log(fields)
    const plant = await Plant.create(fields)
    return plant
  }

  async getPlantById (id) {
    const plant = await Plant.find({
      where: { plant_id: id },
      include: {
        model: Picture,
        as: 'Pictures',
        attributes: ['picture_path']
      }
    })
    if (!plant) {
      throw new NotFound('La plante n\'existe pas.')
    }
    return plant
  }

  async getAllPlants () {
    const plantList = await Plant.findAll({
      include: {
        model: Picture,
        as: 'Pictures',
        attributes: ['picture_path']
      }
    })
    return plantList
  }

  async putPlantById ({ fields, id, userId }) {
    const plant = await Plant.findByPk(id)
    if (!plant) {
      throw new NotFound('La plante n\'existe pas.')
    }
    if (plant.user_id !== userId) {
      throw new Unauthorized('Vous n\'êtes pas le propriétaire de cette plante.')
    }
    await plant.update(fields)
    await plant.save()
    return plant
  }

  async deletePlantById ({ id, userId }) {
    const plant = await Plant.findByPk(id)
    if (!plant) {
      throw new NotFound('La plante n\'existe pas.')
    }
    if (plant.user_id !== userId) {
      throw new Unauthorized('Vous n\'êtes pas le propriétaire de cette plante.')
    }
    await Plant.destroy({ where: { plant_id: id } })
  }

  async getAllPlantByUserId ({ id }) {
    const plantList = await Plant.findAll({
      where: { user_id: id },
      include: {
        model: Picture,
        as: 'Pictures',
        attributes: ['picture_path']
      }

    })
    return plantList
  }
}
