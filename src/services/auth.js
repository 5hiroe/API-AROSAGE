import UserModel from '../models/user.js'
import { Conflict, Unauthorized } from '../globals/errors.js'
import JWTService from '../services/jwt.js'
import { encrypt, decrypt } from '../helpers/encryption.js'
const JWTServiceInstance = new JWTService()

export default class AuthService {
    /**
   * AuthService is a singleton.
   */
  constructor () {
    if (AuthService.instance instanceof AuthService) {
      return AuthService.instance
    }
    Object.freeze(this)
    AuthService.instance = this
  }

  async signup ({ firstName, lastName, birthdate, email, password, phone, address, picture }) {
    const existingUser = await UserModel.findOne({ email })
    if (existingUser){
        throw new Conflict('Email déjà utilisé.')
    }

    const encodedPassword = encrypt(password)

    const user = await UserModel.create({ firstName, lastName, birthdate: new Date(birthdate), email, password: encodedPassword, phone, address, picture })
    return JWTServiceInstance.generate(user)
  }

  async login ({ email, password }) {
    const user = await UserModel.findOne({ email })
    console.log(user)
    if (!user) {
      throw new NotFound('Utilisateur non trouvé.')
    }
    if (decrypt(user.password) !== password) {
      throw new Unauthorized('Mot de passe incorrect.')
    }
    return JWTServiceInstance.generate(user)
  }
}