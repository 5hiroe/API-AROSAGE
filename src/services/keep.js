import { Keep } from '../models/keep.js'

export default class KeepService {
  constructor () {
    if (KeepService.instance instanceof KeepService) {
      return KeepService.instance
    }
    Object.freeze(this)
    KeepService.instance = this
  }

  async createKeep ({ fields }) {
    await Keep.create({ ...fields })
  }
}
