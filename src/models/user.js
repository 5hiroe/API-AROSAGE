import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    lastname_user: {
      type: DataTypes.STRING(50),
    },
    firstname_user: {
      type: DataTypes.STRING(50),
    },
    birthdate_user: {
      type: DataTypes.DATE,
    },
    email_user: {
      type: DataTypes.STRING(255),
    },
    phone_user: {
      type: DataTypes.STRING(10),
    },
    password_user: {
      type: DataTypes.STRING(255),
    },
    picture_path_user: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'USER',
    timestamps: false,
  });

  return User;
};
