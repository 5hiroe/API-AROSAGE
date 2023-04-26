// models/picture.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Picture = sequelize.define('Picture', {
    picture_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    feedback_id: {
      type: DataTypes.INTEGER,
    },
    plant_id: {
      type: DataTypes.INTEGER,
    },
    picture_path: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'PICTURE',
    timestamps: false,
  });

  return Picture;
};
