import UploadHelper from '../helpers/upload.js'
import UploadService from '../services/upload.js'
const UploadServiceInstance = new UploadService()
const UploadHelperInstance = new UploadHelper()

export async function uploadUserPicture (req, res) {
    const { id } = req.jwt.data
    const file = await UploadHelperInstance.uploadUserPicture({ req, res })
    const user = await UploadServiceInstance.userPicture({ id, file })
    return res.status(200).json({
        message: "Votre photo de profil a bien été mise à jour !",
        user
    })
}

export async function uploadPlantPicture (req, res) {
    const { plantId } = req.params
    const { id } = req.jwt.data
    const file = await UploadHelperInstance.uploadPlantPicture({ req, res })
    const plant = await UploadServiceInstance.plantPicture({ id, plantId, file })
    return res.status(200).json({
        message: "La photo de votre plante a bien été mise à jour !",
        plant
    })
}