import { DataTypes } from 'sequelize'
import { sequelize } from '../configurations/database.js'

export const Feedback = sequelize.define('Feedback', {
  feedback_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  keep_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date_feedback: {
    type: DataTypes.DATE
  },
  time_feedback: {
    type: DataTypes.TIME
  },
  score_feedback: {
    type: DataTypes.INTEGER
  },
  instructions_feedback: {
    type: DataTypes.STRING(500)
  }
}, {
  tableName: 'FEEDBACK',
  timestamps: false
})
