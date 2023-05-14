import { NotFound } from '../globals/errors.js'
import { Picture } from '../models/picture.js'

export default class ImageService {
  constructor () {
    if (ImageService.instance instanceof ImageService) {
      return ImageService.instance
    }
    Object.freeze(this)
    ImageService.instance = this
  }

  async getUserPicture ({ id }) {
    const foundedPicture = await Picture.findOne({ where: { feedback_id: id } })
    if (!foundedPicture) {
      throw NotFound('Aucune image trouvée.')
    }
    return foundedPicture
  }

  async getPlantPicture ({ id }) {
    const foundedPicture = await Picture.findOne({ where: { plant_id: id } })
    if (!foundedPicture) {
      throw NotFound('Aucune image trouvée.')
    }
    return foundedPicture
  }
}
