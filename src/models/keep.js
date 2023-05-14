import { DataTypes } from 'sequelize'
import { sequelize } from '../configurations/database.js'
// import { Plant } from './plant.js'
// import { Contient } from './contient.js'

export const Keep = sequelize.define('Keep', {
  keep_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  location_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  use_user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  start_date_keep: {
    type: DataTypes.DATE
  },
  end_date_keep: {
    type: DataTypes.DATE
  },
  status_keep: {
    type: DataTypes.STRING(50)
  },
  instruction_keep: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'KEEP',
  timestamps: false
})
