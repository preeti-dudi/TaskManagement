import React, { useEffect, useState } from 'react';
import { Task } from '../../types';
import api from '../../utils/network';
import { useParams } from 'react-router-dom';

const UpdateTask = () => {


  const { id } = useParams<{ id: string }>(); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        setTitle(response.data?.title);
        setDescription(response.data?.description);
        setStatus(response.data?.status);
        setDueDate(new Date(response.data?.due_date).toISOString().slice(0, 10));
      } catch (error) {
        alert('Failed to fetch task');
      }
    };

    fetchTask();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `/tasks/${id}`,
        {
          title,
          description,
          status,
          due_date: dueDate,
        }
      );
      window.location.href="/tasks";
      alert('Task updated successfully!');
    } catch (error) {
      alert('Failed to update task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => {
          setDueDate(e.target.value)}}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button className='app-button' type="submit">Update Task</button>
    </form>
  );
};

export default UpdateTask;
