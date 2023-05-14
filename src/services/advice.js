import { Plant } from '../models/plant.js'
import { Advice } from '../models/advice.js'
import { Botanist } from '../models/botanist.js'
import { NotFound } from '../globals/errors.js'

export default class AdviceService {
  constructor () {
    if (AdviceService.instance instanceof AdviceService) {
      return AdviceService.instance
    }
    Object.freeze(this)
    AdviceService.instance = this
  }

  async create ({ fields, id }) {
    const plant = await Plant.findByPk(fields.plant_id)
    if (!plant) {
      throw new NotFound('La plante n\'existe pas.')
    }
    const botanist = await Botanist.findByPk(id)
    if (!botanist) {
      throw new NotFound('Le botaniste n\'existe pas.')
    }
    fields.botanist_id = id
    const advice = await Advice.create(fields)
    return advice
  }

  async findAllByPlant ({ id }) {
    const plant = await Plant.findByPk(id)
    if (!plant) {
      throw new NotFound('La plante n\'existe pas.')
    }
    const adviceList = await Advice.findAll({ where: { plant_id: id } })
    return adviceList
  }
}
