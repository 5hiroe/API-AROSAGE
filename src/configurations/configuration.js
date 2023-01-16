import * as express from './express.js'
import * as mongo from './mongo.js'

export async function configure (app) {
  await express.configure(app)
  await mongo.configure(app)
}

export default configure
