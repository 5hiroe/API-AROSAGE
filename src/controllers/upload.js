import UploadHelper from '../helpers/upload.js'
import UploadService from '../services/upload.js'
const UploadHelperInstance = new UploadHelper()
const UploadServiceInstance = new UploadService()

export async function userPicture (req, res) {
  const { id } = req.jwt.data
  const picture = await UploadHelperInstance.uploadUserPicture({ req, res })
  const userPicture = await UploadServiceInstance.userPicture({ picture, id })
  return res.status(200).json({ userPicture })
}

export async function plantPicture (req, res) {
  const { id } = req.params
  const picture = await UploadHelperInstance.uploadPlantPicture({ req, res })
  const plantPicture = await UploadServiceInstance.plantPicture({ picture, id })
  return res.status(200).json({ plantPicture })
}
