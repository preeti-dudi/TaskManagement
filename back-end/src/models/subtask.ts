import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Task from './task';

const Subtask = sequelize.define('subtask', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Subtask.belongsTo(Task, { foreignKey: 'taskId' });
Task.hasMany(Subtask, { foreignKey: 'taskId' });

export default Subtask;
