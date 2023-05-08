import { Conflict, NotFound } from '../globals/errors.js'
import { Keep } from '../models/keep.js'
import { Plant } from '../models/plant.js'
import { User } from '../models/user.js'
import { AVAILABLE } from '../globals/keep_status.js'

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
    // Fonction pour créer une Adresse  #1
    // Fonction pour créer une Location  #2
    const keepFields = {
      user_id: userId,
      location_id: 'LA_LOCALISATION_CREEE', // #2
      status: AVAILABLE,
      instructions: fields.instructions,
      start_date_keep: fields.start_date_keep,
      end_date_keep: fields.end_date_keep
    }
    const keep = await Keep.create(keepFields)

    const plants = []

    for (const plantId in fields.plants) {
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
