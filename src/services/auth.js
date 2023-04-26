import { Op, or } from 'sequelize'
import { User } from '../models/user.js'
import { Conflict, NotFound } from '../globals/errors.js'
import JWTService from './jwt.js'
import { encrypt, decrypt } from '../helpers/encryption.js'
const JWTServiceInstance = new JWTService()

export default class AuthService {
    constructor () {
        if (AuthService.instance instanceof AuthService) {
          return AuthService.instance
        }
        Object.freeze(this)
        AuthService.instance = this
      }

      async signup ({ fields }) {
        const userExist = await User.findOne({ where: {[Op.or]: [{ email_user: fields.email_user }, {phone_user: fields.phone_user} ]}})
        if (userExist) {
          throw new Conflict('Email ou Téléphone déjà utilisés.')
        }
        fields.password_user = encrypt(fields.password_user)
        const user = await User.create({...fields})
        const jwt = await JWTServiceInstance.generate({ id: user.user_id })
        return jwt
      }

      async login ({ email, password }) {
        const user = await User.findOne({ where: { email_user: email } })
        if (!user) {
          throw new Conflict('Utilisateur ou mot de passe incorrect.')
        }
        if (decrypt(user.password_user) !== password) {
          throw new Conflict('Utilisateur ou mot de passe incorrect.')
        }
        const jwt = await JWTServiceInstance.generate({ id: user.user_id })
        return jwt
      }

}