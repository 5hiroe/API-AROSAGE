// models/picture.js
import { DataTypes } from 'sequelize'
import { sequelize } from '../configurations/database.js'

export const Picture = sequelize.define('Picture', {
  picture_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  feedback_id: {
    type: DataTypes.INTEGER
  },
  plant_id: {
    type: DataTypes.INTEGER
  },
  picture_path: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'PICTURE',
  timestamps: false
})
