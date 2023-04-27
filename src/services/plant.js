import { sequelize } from '../configurations/database.js'
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
    const plant = await Plant.findByPk(id)
    if (!plant) {
      throw new NotFound('La plant n\'existe pas.')
    }
    return plant
  }

  async putPlantById ({ fields, id }) {
    // TODO : Checker pourquoi le traitement commenter ne fonctionne pas
    // const plant = await Plant.update({ ...fields }, { where: { plant_id: id } })
    // TODO : Le code si dessous ne gère pas les appostrophe lors d'un update dans une chaine ( TODO FRONT )
    const plant = await sequelize.query(`UPDATE PLANT SET name_plant='${fields.name_plant}', instructions_plant='${fields.instructions_plant}', type_plant='${fields.type_plant}',status_plant='${fields.status_plant}' WHERE plant_id = ${id}`)
    if (!plant) {
      throw new NotFound('La plant n\'existe pas.')
    }
    return plant
  }

  async deletePlantById ({ id }) {
    console.log('test', id)
    await Plant.destroy({ where: { plant_id: id } })
  }

  async getAllPlantByUserId ({ id }) {
    console.log('test', id)
    const plantList = await Plant.findAll({ where: { user_id: id } })
    console.log(plantList)
    return plantList
  }
}
