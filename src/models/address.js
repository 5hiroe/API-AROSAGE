import { DataTypes } from 'sequelize'
import { sequelize } from '../configurations/database.js'

export const Address = sequelize.define('Address', {
  address_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  address1_address: {
    type: DataTypes.STRING(255)
  },
  address2_address: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  city_address: {
    type: DataTypes.STRING(255)
  },
  postal_code_address: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'ADDRESS',
  timestamps: false
})
