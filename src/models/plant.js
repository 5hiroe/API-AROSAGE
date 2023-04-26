import { DataTypes } from 'sequelize'

export default (sequelize) => {
  const Plant = sequelize.define('Plant', {
    plant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
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

  return Plant
}
