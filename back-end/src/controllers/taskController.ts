import { Request, Response } from 'express';
import Task from '../models/task';
import Subtask from '../models/subtask';
import { AuthorisedRequest } from '../middleware/authMiddleware';



export const createTask = async (req: AuthorisedRequest, res: Response) => {
  const {
    title,
    description,
    color,
    icon,
    scheduledDate,
    repeatFrequency,
    repeatInterval,
    repeatEndDate,
    timeType,
    startTime,
    endTime,
    reminder,
    tag,
    subtasks,
    userId, // The ID of the user who is creating the task
  } = req.body;

  try {
    // Create the task associated with a user
    const newTask = await Task.create({
      title,
      description,
      color,
      icon,
      scheduledDate,
      repeatFrequency,
      repeatInterval,
      repeatEndDate,
      timeType,
      startTime,
      endTime,
      reminder,
      tag,
      userId, // Associate the task with a user
    });

    // Create subtasks if provided
    if (subtasks && subtasks.length > 0) {
      subtasks.forEach(async (subtask: any) => {
        await Subtask.create({ title: subtask?.title, taskId: newTask?.id });
      });
    }

    res.status(201).json({ message: 'Task created successfully', newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating task' });
  }
};

export const getTasks = async (req: AuthorisedRequest, res: Response) => {
  try {
    const userId = req.userId;
    // Get order by and direction from query parameters
    const orderBy = req.query.orderBy as string || 'due_date'; // default to due_date
    const direction = req.query.direction === 'desc' ? 'DESC' : 'ASC'; // default to ASC

    // Ensure orderBy is one of the allowed fields
    const allowedFields = ['due_date', 'createdAt', 'updatedAt'];
    if (!allowedFields.includes(orderBy)) {
      return res.status(400).json({ message: `Invalid orderBy field. Allowed fields are ${allowedFields.join(', ')}` });
    }

    const tasks = await Task.findAll({
      where: { userId },
      include: Subtask,
      order: [[orderBy, direction]],
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

export const getTask = async (req: AuthorisedRequest, res: Response) => {
  try {
    const taskId = req.params.id;
    const userId = req.userId;

    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

export const updateTask = async (req: AuthorisedRequest, res: Response) => {
  try {
    const { title, description, status, due_date } = req.body;
    const taskId = req.params.id;
    const userId = req.userId;

    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

export const deleteTask = async (req: AuthorisedRequest, res: Response) => {
  try {
    const taskId = req.params.id;
    const userId = req.userId;

    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};
