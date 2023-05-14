import UploadHelper from '../helpers/upload.js'
import UploadService from '../services/upload.js'
const UploadHelperInstance = new UploadHelper()
const UploadServiceInstance = new UploadService()

export async function userPicture (req, res) {
  console.log('userPicture')
  const { id } = req.params
  console.log('id', id)
  const picture = await UploadHelperInstance.uploadUserPicture({ req, res })
  console.log('picture', picture.toString())
  const image = await UploadServiceInstance.userPicture({ picture, id })
  console.log('image', image)
  return res.status(200).json({ message: 'Image mise en ligne avec succès.', image })
}

export async function plantPicture (req, res) {
  console.log('plantPicture')
  const { id } = req.params
  console.log('id', id)
  const picture = await UploadHelperInstance.uploadPlantPicture({ req, res })
  console.log('picture', picture.toString())
  const image = await UploadServiceInstance.plantPicture({ picture, id })
  console.log('image', image)
  return res.status(200).json({ message: 'Image mise en ligne avec succès.', image })
}
