import { Request, Response } from 'express';
import Task from '../models/task';
import { AuthorisedRequest } from '../middleware/authMiddleware';



export const createTask = async (req: AuthorisedRequest, res: Response) => {
  try {
    const { title, description, status, due_date } = req.body;
    const userId = req.user?.id;

    const task = await Task.create({
      title,
      description,
      status,
      due_date,
      userId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

export const getTasks = async (req: AuthorisedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
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
      order: [[orderBy, direction]], // Add order clause
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

export const getTask = async (req: AuthorisedRequest, res: Response) => {
  try {
    const taskId = req.params.id;
    const userId = req.user?.id;

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
    const userId = req.user?.id;

    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.update({ title, description, status, due_date });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

export const deleteTask = async (req: AuthorisedRequest, res: Response) => {
  try {
    const taskId = req.params.id;
    const userId = req.user?.id;

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
