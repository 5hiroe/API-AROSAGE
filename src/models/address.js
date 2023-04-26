import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Address = sequelize.define('Address', {
    address_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    address1_address: {
      type: DataTypes.STRING(255),
    },
    address2_address: {
      type: DataTypes.STRING(255),
    },
    city_address: {
      type: DataTypes.STRING(255),
    },
    postal_code_address: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'ADDRESS',
    timestamps: false,
  });

  return Address;
};
