import { PLANT_PICTURES_PATH, USER_PICTURES_PATH } from '../globals/image.js'
import ImageService from '../services/image.js'
const ImageServiceInstance = new ImageService()

export async function userPicture (req, res) {
  const { id } = req.params
  const image = await ImageServiceInstance.getUserPicture({ id })
  const path = `${USER_PICTURES_PATH}/${image.picture_path}`
  return res.download(path)
}

export async function plantPicture (req, res) {
  const { id } = req.params
  const image = await ImageServiceInstance.getPlantPicture({ id })
  const path = `${PLANT_PICTURES_PATH}/${image.picture_path}`
  return res.download(path)
}
