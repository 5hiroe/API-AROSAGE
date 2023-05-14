import * as express from './express.js'
import * as sequelize from './database.js'
import { Keep } from '../models/keep.js'
import { Plant } from '../models/plant.js'
import { Contient } from '../models/contient.js'
import { Picture } from '../models/picture.js'
import { Feedback } from '../models/feedback.js'

export async function configure (app) {
  await express.configure(app)
  await sequelize.configure()

  Keep.belongsToMany(Plant, { through: Contient, foreignKey: 'keep_id', as: 'plants' })
  Plant.belongsToMany(Keep, { through: Contient, foreignKey: 'plant_id', as: 'keeps' })
  Plant.hasMany(Picture, { as: 'Pictures', foreignKey: 'plant_id' })
  Picture.belongsTo(Plant, { as: 'PictPlantsures', foreignKey: 'plant_id' })
  Feedback.hasMany(Picture, { as: 'Pictures', foreignKey: 'feedback_id' })
  Picture.belongsTo(Feedback, { as: 'PictFeedbackures', foreignKey: 'feedback_id' })
}

export default configure
