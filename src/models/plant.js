import { DataTypes } from 'sequelize'
import { sequelize } from '../configurations/database.js'

export const Plant = sequelize.define('Plant', {
  plant_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name_plant: {
    type: DataTypes.STRING(255)
  },
  instructions_plant: {
    type: DataTypes.STRING(255)
  },
  type_plant: {
    type: DataTypes.STRING(255)
  },
  status_plant: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'PLANT',
  timestamps: false
})
