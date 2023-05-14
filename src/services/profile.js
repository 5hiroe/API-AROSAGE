import { NotFound, Unauthorized } from '../globals/errors.js'
import { User } from '../models/user.js'

export default class UserService {
  constructor () {
    if (UserService.instance instanceof UserService) {
      return UserService.instance
    }
    Object.freeze(this)
    UserService.instance = this
  }

  async getProfileById (userId) {
    const user = await User.findByPk(userId)
    if (!user) {
      throw new NotFound('Le profil n\'existe pas.')
    }
    return user
  }

  async putProfileById ({ fields, userId }) {
    const user = await User.findByPk(userId)
    if (!user) {
      throw new NotFound('Le profil n\'existe pas.')
    }
    if (user.user_id !== userId) {
      throw new Unauthorized('Vous n\'êtes pas le propriétaire de ce profil.')
    }
    await user.update(fields)
    await user.save()
    return user
  }

  async deleteProfileById ({ userId }) {
    const user = await User.findByPk(userId)
    if (!user) {
      throw new NotFound('Le profil n\'existe pas.')
    }
    if (user.user_id !== userId) {
      throw new Unauthorized('Vous n\'êtes pas le propriétaire de ce profil.')
    }
    await User.destroy({ where: { user_id: userId } })
  }
}
