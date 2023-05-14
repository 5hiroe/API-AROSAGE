import { DataTypes } from 'sequelize'
import { sequelize } from '../configurations/database.js'

export const Advice = sequelize.define('Advice', {
  advice_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  botanist_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  plant_id: {
    type: DataTypes.INTEGER
  },
  instructions_advice: {
    type: DataTypes.STRING(500)
  }
}, {
  tableName: 'ADVICE',
  timestamps: false
})
