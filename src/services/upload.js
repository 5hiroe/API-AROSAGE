import { USER_PICTURES_PATH, PLANT_PICTURES_PATH } from '../globals/image.js'
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
    const foundedPicture = await Picture.findOne({ where: { feedback_id: id } })
    if (foundedPicture && fs.existsSync(`${USER_PICTURES_PATH}/${foundedPicture.picture_path}`)) {
      fs.unlinkSync(`${USER_PICTURES_PATH}/${foundedPicture.picture_path}`)
    }
    const createdPicture = await Picture.create({ picture_path: picture.path, feedback_id: id })
    return createdPicture
  }

  async plantPicture ({ picture, id }) {
    const foundedPicture = await Picture.findOne({ where: { plant_id: id } })
    if (foundedPicture && fs.existsSync(`${PLANT_PICTURES_PATH}/${foundedPicture.picture_path}`)) {
      try {
        fs.unlinkSync(`${PLANT_PICTURES_PATH}/${foundedPicture.picture_path}`)
      } catch (error) {
        console.log('Cant delete file')
      }
    }
    const createdPicture = await Picture.create({ picture_path: picture.path, plant_id: id })
    return createdPicture
  }
}
