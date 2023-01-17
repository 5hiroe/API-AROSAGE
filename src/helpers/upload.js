import { v4 as uuidv4 } from 'uuid'
import Multer from 'multer'
import Path from 'path'
import { USER_PICTURE_PATH, PLANT_PICTURE_PATH } from '../globals/folders.js'
import { PICTURE_MIME_TYPES, FILE_SIZE_LIMIT } from '../globals/mimes.js'

export default class UploadHelper {
    constructor () {
      if (UploadHelper.instance instanceof UploadHelper) {
        return UploadHelper.instance
      }
    }

    /**
   * Configure the file destination.
   */
  _destination (path) {
    return (req, file, cb) => {
      cb(null, path)
    }
  }

  /**
   * Configure the file name.
   */
  _filename (req, file, cb) {
    const name = uuidv4() + Path.extname(file.originalname)
    cb(null, name)
  }

   // User picture storage configuration.
   _userPictureStorage = Multer.diskStorage({
    destination: this._destination(USER_PICTURE_PATH),
    filename: this._filename
  })

   // Plant picture storage configuration.
   _plantPictureStorage = Multer.diskStorage({
    destination: this._destination(PLANT_PICTURE_PATH),
    filename: this._filename
  })

    // User picture upload configuration.
    _userPicture = Multer({
        storage: this._userPictureStorage,
        fileFilter: this._userPictureFilter,
        limits: {
          fileSize: FILE_SIZE_LIMIT
        }
      }).single('picture')

    // Plant picture upload configuration.
    _plantPicture = Multer({
        storage: this._plantPictureStorage,
        fileFilter: this._plantPictureFilter,
        limits: {
          fileSize: FILE_SIZE_LIMIT
        }
      }).single('picture')
    
    // User picture filter configuration.
    _userPictureFilter (req, file, cb) {
        if (!PICTURE_MIME_TYPES.includes(file.mimetype)) {
        cb(new BadRequest({ message: 'Format d\'image invalide. Les formats acceptés sont JPG, JPEG et PNG.' }))
        }
        cb(null, true)
    }

    // Plant picture filter configuration.
    _plantPictureFilter (req, file, cb) {
        if (!PICTURE_MIME_TYPES.includes(file.mimetype)) {
        cb(new BadRequest({ message: 'Format d\'image invalide. Les formats acceptés sont JPG, JPEG et PNG.' }))
        }
        cb(null, true)
    }

    /**
   * Upload file.
   *
   * @param req
   * @param res
   * @param {MulterObject} multerInstance
   * @returns
   */
  async _upload ({ req, res, multerInstance }) {
    return new Promise((resolve, reject) => {
      return multerInstance(req, res, (err) => {
        if (err instanceof Multer.MulterError) {
          reject(
            new BadRequest({ message: err.message, errors: err.storageErrors })
          )
        } else if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  /**
   * Upload user profile picture.
   */
  async uploadUserPicture ({ req, res }) {
    await this._upload({
      req,
      res,
      multerInstance: this._userPicture
    })

    return req.file
  }

  /**
   * Upload plant profile picture.
   */
  async uploadPlantPicture ({ req, res }) {
    await this._upload({
      req,
      res,
      multerInstance: this._plantPicture
    })

    return req.file
  }
}