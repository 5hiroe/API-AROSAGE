import * as express from './express.js'
import * as sequelize from './database.js'
import { Keep } from '../models/keep.js'
import { Plant } from '../models/plant.js'
import { Contient } from '../models/contient.js'

export async function configure (app) {
  await express.configure(app)
  await sequelize.configure()

  Keep.belongsToMany(Plant, { through: Contient, foreignKey: 'keep_id', as: 'plants' })
  Plant.belongsToMany(Keep, { through: Contient, foreignKey: 'plant_id', as: 'keeps' })
}

export default configure
