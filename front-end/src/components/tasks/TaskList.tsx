import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { Link } from 'react-router-dom';
import api from '../../utils/network';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [orderBy, setOrderBy] = useState('due_date');
  const [direction, setDirection] = useState('asc');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get(`/tasks?orderBy=${orderBy}&direction=${direction}`);
        setTasks(response.data);
      } catch (error) {
        alert('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, [direction,orderBy]);

  return (
    <div>
      <div className='task-list-head'>
      <h1>My Tasks</h1>
      <Link to="/tasks/add" className="link">Add Tasks</Link>
      </div>

      <div className="sort-options">
        <label>
          Sort by:
          <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
            <option value="due_date">Due Date</option>
            <option value="createdAt">Created At</option>
            <option value="updatedAt">Updated At</option>
          </select>
        </label>

        <label>
          Direction:
          <select value={direction} onChange={(e) => setDirection(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <div  className='flex'>
      {tasks.map(( task, index) => (
        <TaskItem key={index} task={task} />
      ))}
      </div>
    </div>
  );
};

export default TaskList;
