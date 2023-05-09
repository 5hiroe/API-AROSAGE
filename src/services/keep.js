import { Conflict, NotFound } from '../globals/errors.js'
import { Keep } from '../models/keep.js'
import { Plant } from '../models/plant.js'
import { User } from '../models/user.js'
import { AVAILABLE } from '../globals/keep_status.js'
import LocationService from './location.js'
const LocationServiceInstance = new LocationService()

export default class KeepService {
  constructor () {
    if (KeepService.instance instanceof KeepService) {
      return KeepService.instance
    }
    Object.freeze(this)
    KeepService.instance = this
  }

  async createKeep ({ fields, userId }) {
    const user = User.findByPk(userId)
    if (!user) {
      throw new NotFound('Utilisateur non trouvé.')
    }

    const address = {
      address1_address: fields.adress1,
      address2_address: fields.adress2,
      city_address: fields.city,
      postal_code_address: fields.postal_code
    }
    // const location = await LocationServiceInstance.createLocation({ fields: address, latitude: fields.latitude, longitude: fields.longitude })
    const location = await LocationServiceInstance.createLocation({ fields: address, latitude: 43.610769, longitude: 3.876716 })

    const keepFields = {
      user_id: userId,
      location_id: location.location_id, // #2
      status: AVAILABLE,
      instruction_keep: fields.instruction_keep,
      start_date_keep: fields.start_date_keep,
      end_date_keep: fields.end_date_keep
    }
    const keep = await Keep.create(keepFields)

    const plants = []
    console.log(fields.plants)
    for (const plantId of fields.plants) {
      console.log(plantId)
      const plant = await Plant.findByPk(plantId)
      if (!plant) {
        throw new NotFound('Plante non toruvée.')
      }
      if (plant.keep_id) {
        throw new Conflict('La Plante est déjà dans une garde.')
      }
      await plant.update({ keep_id: keep.keep_id })
      await plant.save()
      plants.push(plant)
    }

    keep.plants = plants
    return keep
  }

  async getKeepByUser ({ id }) {
    const user = await User.findByPk(id)
    if (!user) {
      throw new NotFound('Utilisateur non trouvé.')
    }
    const keepList = await Keep.findAll({ where: { user_id: id } })
    return keepList
  }
}
