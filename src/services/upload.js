import UserModel from '../models/user.js'
import PlantModel from '../models/plant.js'
import { NotFound, Unauthorized } from '../globals/errors.js'
import {
    USER_PICTURE_PATH,
    PLANT_PICTURE_PATH
} from '../globals/folders.js'
import fs from 'fs'

export default class UploadService {
  /**
     * UploadService is a singleton.
     */
  constructor () {
    if (UploadService.instance instanceof UploadService) {
      return UploadService.instance
    }
    Object.freeze(this)
    UploadService.instance = this
  }

  async userPicture ({file, id}) {
    const user = await UserModel.findById(id)
    if (!user) {
        fs.unlinkSync(`${USER_PICTURE_PATH}/${file.filename}`)
        throw new NotFound('Utilisateur non trouvé.')
    }

    // If the postulant already has a picture, we delete it
    if (user.picture) {
        // If the file doesn't exist, we delete the imported file, remove the link in the postulant profile and throw an error
        if (!fs.existsSync(`${USER_PICTURE_PATH}/${user.picture}`)) {
            fs.unlinkSync(`${USER_PICTURE_PATH}/${file.filename}`)
            user.picture = null
            await user.save()
            throw new NotFound('Erreur lors de la suppression de l\'ancienne image, veuillez réessayer.')
        }
        fs.unlinkSync(`${USER_PICTURE_PATH}/${user.picture}`)
    }
    // Save the new picture into user's profile
    user.picture = file.filename
    await user.save()

    return user
  }

  async plantPicture ({file, id, plantId}) {
    const plant = await PlantModel.findById(plantId)
    if (!plant) {
        fs.unlinkSync(`${PLANT_PICTURE_PATH}/${file.filename}`)
        throw new NotFound('Plante non trouvée.')
    }

    if (plant.user.toString() !== id) {
        fs.unlinkSync(`${PLANT_PICTURE_PATH}/${file.filename}`)
        throw new Unauthorized('Vous n\'êtes pas autorisé à modifier cette plante.')
    }

    // If the postulant already has a picture, we delete it
    if (plant.picture) {
        // If the file doesn't exist, we delete the imported file, remove the link in the postulant profile and throw an error
        if (!fs.existsSync(`${PLANT_PICTURE_PATH}/${plant.picture}`)) {
            fs.unlinkSync(`${PLANT_PICTURE_PATH}/${file.filename}`)
            plant.picture = null
            await user.save()
            throw new NotFound('Erreur lors de la suppression de l\'ancienne image, veuillez réessayer.')
        }
        fs.unlinkSync(`${USER_PICTURE_PATH}/${file.filename}`)
    }
    // Save the new picture into user's profile
    plant.picture = file.filename
    await plant.save()

    return plant
  }
}