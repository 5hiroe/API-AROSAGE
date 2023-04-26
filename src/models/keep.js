import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Keep = sequelize.define('Keep', {
    keep_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    use_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date_keep: {
      type: DataTypes.DATE,
    },
    end_date_keep: {
      type: DataTypes.DATE,
    },
    status_keep: {
      type: DataTypes.STRING(50),
    },
    instruction_keep: {
      type: DataTypes.STRING(255),
    },
  }, {
    tableName: 'KEEP',
    timestamps: false,
  });

  return Keep;
};
