import { NotFound } from '../globals/errors.js'
import { Plant } from '../models/plant.js'

export default class PlantService {
  constructor () {
    if (PlantService.instance instanceof PlantService) {
      return PlantService.instance
    }
    Object.freeze(this)
    PlantService.instance = this
  }

  async createPlant ({ fields }) {
    await Plant.create({ ...fields })
  }

  async getPlantById (id) {
    console.log(id)
    const plant = await Plant.findByPk(1)
    if (!plant) {
      throw new NotFound('La plant n\'existe pas.')
    }
    return plant
  }
}
