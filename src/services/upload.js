import { USER_PICTURES_PATH } from '../globals/image.js'
import { Picture } from '../models/picture.js'
import fs from 'fs'

export default class UploadService {
  constructor () {
    if (UploadService.instance instanceof UploadService) {
      return UploadService.instance
    }
    Object.freeze(this)
    UploadService.instance = this
  }

  async userPicture ({ picture, id }) {
    const foundedPicture = await Picture.findOne({ where: { user_id: id } })
    if (foundedPicture && fs.existsSync(`${USER_PICTURES_PATH}/${foundedPicture.picture_path}`)) {
      fs.unlinkSync(`${USER_PICTURES_PATH}/${foundedPicture.picture_path}`)
    }
    const createdPicture = await Picture.create({ picture_path: picture, user_id: id })
    return createdPicture
  }

  async plantPicture ({ picture, id }) {
    const foundedPicture = await Picture.findOne({ where: { plant_id: id } })
    if (foundedPicture && fs.existsSync(`${USER_PICTURES_PATH}/${foundedPicture.picture_path}`)) {
      fs.unlinkSync(`${USER_PICTURES_PATH}/${foundedPicture.picture_path}`)
    }
    const createdPicture = await Picture.create({ picture_path: picture, plant_id: id })
    return createdPicture
  }
}
