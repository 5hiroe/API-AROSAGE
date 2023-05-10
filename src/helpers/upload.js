import { v4 as uuidv4 } from 'uuid'
import Multer from 'multer'
import Path from 'path'
import { BadRequest } from '../globals/errors.js'
import { FILE_SIZE_LIMIT, PICTURE_MIMES, PLANT_PICTURES_PATH, USER_PICTURES_PATH } from '../globals/image.js'

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

  // Filters
  _pictureFilter (req, file, cb) {
    if (!PICTURE_MIMES.includes(file.mimetype)) {
      cb(new BadRequest())
    }
    cb(null, true)
  }

  // Multer instances.
  _plantPicture = Multer({
    storage: Multer.diskStorage({
      destination: this._destination(PLANT_PICTURES_PATH),
      filename: this._filename
    }),
    fileFilter: this._pictureFilter,
    limits: { fileSize: FILE_SIZE_LIMIT }
  }).single('picture')

  _userPicture = Multer({
    storage: Multer.diskStorage({
      destination: this._destination(USER_PICTURES_PATH),
      filename: this._filename
    }),
    fileFilter: this._pictureFilter,
    limits: { fileSize: FILE_SIZE_LIMIT }
  }).single('picture')

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

  async uploadPlantPicture ({ req, res }) {
    await this._upload({
      req,
      res,
      multerInstance: this._plantPicture
    })
    return req.file
  }

  async uploadUserPicture ({ req, res }) {
    await this._upload({
      req,
      res,
      multerInstance: this._userPicture
    })
    return req.file
  }
}
