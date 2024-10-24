import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

interface TaskAttributes {
  id: number;
  title: string;
  description?: string;
  color?: string;
  icon?: string;
  scheduledDate?: Date;
  repeatFrequency: 'none' | 'daily' | 'weekly' | 'monthly';
  repeatInterval: number;
  repeatEndDate?: Date;
  timeType: 'period' | 'point';
  startTime?: string;
  endTime?: string;
  reminder: boolean;
  tag?: string;
  userId: number; // Foreign key reference to User
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description?: string;
  public color?: string;
  public icon?: string;
  public scheduledDate?: Date;
  public repeatFrequency!: 'none' | 'daily' | 'weekly' | 'monthly';
  public repeatInterval!: number;
  public repeatEndDate?: Date;
  public timeType!: 'period' | 'point';
  public startTime?: string;
  public endTime?: string;
  public reminder!: boolean;
  public tag?: string;
  public userId!: number; // Foreign key reference to User

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    color: {
      type: DataTypes.STRING,
    },
    icon: {
      type: DataTypes.STRING,
    },
    scheduledDate: {
      type: DataTypes.DATE,
    },
    repeatFrequency: {
      type: DataTypes.ENUM('none', 'daily', 'weekly', 'monthly'),
      defaultValue: 'none',
    },
    repeatInterval: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    repeatEndDate: {
      type: DataTypes.DATE,
    },
    timeType: {
      type: DataTypes.ENUM('period', 'point'),
      defaultValue: 'point',
    },
    startTime: {
      type: DataTypes.TIME,
    },
    endTime: {
      type: DataTypes.TIME,
    },
    reminder: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tag: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'tasks', // Correct the table name
  }
);

// Define the associations
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Task, { foreignKey: 'userId' });

export default Task;

