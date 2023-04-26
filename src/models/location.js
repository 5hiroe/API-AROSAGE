import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Location = sequelize.define('Location', {
    location_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latitude_location: {
      type: DataTypes.STRING(255),
    },
    longitude_location: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'LOCATION',
    timestamps: false,
  });

  return Location;
};
