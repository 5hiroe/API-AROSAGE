import ImageService from '../services/image.js'
const ImageServiceInstance = new ImageService()

export async function userPicture (req, res) {
  const { id } = req.params
  const image = await ImageServiceInstance.getUserPicture({ id })
  const path = `${image.picture_path}`
  return res.download(path)
}

export async function plantPicture (req, res) {
  const { id } = req.params
  const image = await ImageServiceInstance.getPlantPicture({ id })
  const path = `${image.picture_path}`
  return res.download(path)
}
