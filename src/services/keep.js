import { Conflict, NotFound } from '../globals/errors.js'
import { Keep } from '../models/keep.js'
import { Plant } from '../models/plant.js'
import { User } from '../models/user.js'
import { AVAILABLE, BOOKED } from '../globals/keep_status.js'
import LocationService from './location.js'
import { Sequelize } from 'sequelize'
import { Firestore } from '@google-cloud/firestore'
const LocationServiceInstance = new LocationService()
const firestore = new Firestore({
  projectId: 'arosaje-a8877',
  keyFilename: '../arosaje-a8877-firebase-adminsdk-iwje8-9456006420.json'
})

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
    console.log(fields)
    const address = {
      address1_address: fields.address1,
      address2_address: fields.address2,
      city_address: fields.city,
      postal_code_address: fields.postal_code
    }
    // const location = await LocationServiceInstance.createLocation({ fields: address, latitude: fields.latitude, longitude: fields.longitude })
    const location = await LocationServiceInstance.createLocation({ fields: address })

    const keepFields = {
      user_id: userId,
      location_id: location.location_id, // #2
      status_keep: AVAILABLE,
      instruction_keep: fields.instruction_keep,
      start_date_keep: fields.start_date_keep,
      end_date_keep: fields.end_date_keep
    }
    const keep = await Keep.create(keepFields)

    for (const plantId of fields.plants) {
      const plant = await Plant.findByPk(plantId)
      if (!plant) {
        throw new NotFound('Plante non trouvée.')
      }
      await plant.addKeep(keep)
    }
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

  async getKeepById ({ id }) {
    const keep = await Keep.findOne({
      where: { keep_id: id },
      include: {
        model: Plant,
        as: 'plants',
        attributes: ['plant_id'],
        through: {
          attributes: []
        }
      },
      attributes: {
        include: [
          [
            Sequelize.fn('COUNT', Sequelize.col('plants.plant_id')),
            'plant_count'
          ]
        ]
      },
      group: ['Keep.keep_id', 'plants.plant_id']
    })

    if (!keep) {
      throw new NotFound('Garde non trouvée.')
    }
    return keep
  }

  async getAllKeeps () {
    const keeps = await Keep.findAll({
      include: {
        model: Plant,
        as: 'plants',
        attributes: ['plant_id', 'name_plant', 'type_plant', 'instructions_plant'],
        through: {
          attributes: []
        }
      },
      attributes: {
        include: [
          [
            Sequelize.fn('COUNT', Sequelize.col('plants.plant_id')),
            'plant_count'
          ]
        ]
      },
      group: ['Keep.keep_id', 'plants.plant_id']
    })
    return keeps
  }

  async applyKeep ({ id, userId }) {
    const keep = await Keep.findByPk(id)
    if (!keep) {
      throw new NotFound('Garde non trouvée.')
    }
    if (keep.status_keep !== AVAILABLE) {
      throw new Conflict('Garde déjà prise.')
    }
    // if (keep.user_id === userId) {
    //   throw new Conflict('Vous ne pouvez pas postuler à votre propre garde.')
    // }
    const user = await User.findByPk(userId)
    if (!user) {
      throw new NotFound('Utilisateur non trouvé.')
    }

    const conversationRef = firestore.collection('conversations').doc()
    const conversationId = conversationRef.id

    await conversationRef.set({
      id: conversationId,
      members: [userId, keep.user_id],
      lastMessage: '',
      timestamp: Firestore.Timestamp.now()
    })

    keep.use_user_id = userId
    keep.status_keep = BOOKED
    await keep.save()

    return keep
  }

  async getAllAppliedKeeps ({ id }) {
    const keeps = await Keep.findAll({
      where: { status_keep: BOOKED, use_user_id: id },
      include: {
        model: Plant,
        as: 'plants',
        attributes: ['plant_id'],
        through: {
          attributes: []
        }
      },
      attributes: {
        include: [
          [
            Sequelize.fn('COUNT', Sequelize.col('plants.plant_id')),
            'plant_count'
          ]
        ]
      },
      group: ['Keep.keep_id', 'plants.plant_id']
    })
    return keeps
  }

  async getAllKeepsExceptUser ({ id }) {
    const keeps = await Keep.findAll({
      where: { status_keep: AVAILABLE, user_id: { [Sequelize.Op.ne]: id } },
      include: {
        model: Plant,
        as: 'plants',
        attributes: ['plant_id', 'name_plant', 'type_plant', 'instructions_plant'],
        through: {
          attributes: []
        }
      },
      attributes: {
        include: [
          [
            Sequelize.fn('COUNT', Sequelize.col('plants.plant_id')),
            'plant_count'
          ]
        ]
      },
      group: ['Keep.keep_id', 'plants.plant_id']
    })
    return keeps
  }
}
