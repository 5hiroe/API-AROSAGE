import { Op } from 'sequelize'
import { Botanist } from '../models/botanist.js'
import { Conflict, NotFound } from '../globals/errors.js'
import JWTService from './jwt.js'
import { encrypt, decrypt } from '../helpers/encryption.js'
const JWTServiceInstance = new JWTService()

export default class BotanistService {
  constructor () {
    if (BotanistService.instance instanceof BotanistService) {
      return BotanistService.instance
    }
    Object.freeze(this)
    BotanistService.instance = this
  }

  async signup ({ fields }) {
    const botanistExist = await Botanist.findOne({ where: { [Op.or]: [{ email_botanist: fields.email_botanist }, { phone_botanist: fields.phone_botanist }] } })
    if (botanistExist) {
      throw new Conflict('Email ou Téléphone déjà utilisés.')
    }
    fields.password_botanist = encrypt(fields.password_botanist)
    const botanist = await Botanist.create({ ...fields })
    const jwt = await JWTServiceInstance.generate({ id: botanist.botanist_id })
    return jwt
  }

  async login ({ email, password }) {
    const botanist = await Botanist.findOne({ where: { email_botanist: email } })
    if (!botanist) {
      throw new Conflict('Identifiant ou mot de passe incorrect.')
    }
    if (decrypt(botanist.password_botanist) !== password) {
      throw new Conflict('Identifiant ou mot de passe incorrect.')
    }
    const jwt = await JWTServiceInstance.generate({ id: botanist.botanist_id })
    return jwt
  }

  async getBotanist ({ id }) {
    const botanist = await Botanist.findByPk(id)
    if (!botanist) {
      throw new NotFound('Botaniste introuvable.')
    }
    return botanist
  }

  logout ({ jwt }) {
    JWTServiceInstance.remove({ jwt })
  }
}
