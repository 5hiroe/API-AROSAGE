import * as express from './express.js'
import * as sequelize from './database.js'

export async function configure (app) {
  await express.configure(app)
  await sequelize.configure()
}

export default configure
