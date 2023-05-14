import { DataTypes } from 'sequelize'
import { sequelize } from '../configurations/database.js'

export const Contient = sequelize.define('Contient', {
  plant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  keep_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'CONTIENT',
  timestamps: false
})
