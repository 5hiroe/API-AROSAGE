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
}
