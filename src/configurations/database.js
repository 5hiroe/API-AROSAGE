import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

export const sequelize = new Sequelize(process.env.DB_NAME, "root", "", {
  host: process.env.DB_HOST,
  dialect: 'mysql'
})

export async function configure () {
  dotenv.config()

  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
