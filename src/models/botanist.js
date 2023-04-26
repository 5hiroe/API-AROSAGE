import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Botanist = sequelize.define('Botanist', {
    botanist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    lastname_botanist: {
      type: DataTypes.STRING(50),
    },
    firstname_botanist: {
      type: DataTypes.STRING(50),
    },
    birthdate_botanist: {
      type: DataTypes.DATE,
    },
    email_botanist: {
      type: DataTypes.STRING(255),
    },
    phone_botanist: {
      type: DataTypes.STRING(10),
    },
    password_botanist: {
      type: DataTypes.STRING(255),
    },
    picture_path_botanist: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'BOTANIST',
    timestamps: false,
  });

  return Botanist;
};
