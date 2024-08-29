import React from 'react';
import { Task } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faCheck, faSpinner, faHourglass } from '@fortawesome/free-solid-svg-icons';
import api from '../../utils/network';

const TaskItem = ({ task }: { task: Task; }) => {
  
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.delete(
        `/tasks/${task?.id}`
      );
      window.location.href="/tasks";
      alert('Task added successfully!');
    } catch (error) {
      alert('Failed to add task');
    }
  };
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href=`/tasks/edit/${task?.id}`;
    
  };
  const handleChangeStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `/tasks/${task?.id}`,
        {
          title : task?.title,
          description: task?.description,
          status : (task?.status === "Completed") ? "Pending" :  (task?.status === "Pending" ? "In Progress": "Completed"),
          due_date: task?.due_date,
        }
      );
      window.location.href="/tasks";
      alert('Task updated successfully!');
    } catch (error) {
      alert('Failed to update task');
    }
  };

  return (
    <div className={task?.status === "Completed" ? 'completed task-item' : (task?.status === "Pending" ? 'pending task-item' : 'in-progress task-item')}>
      <h3>{task?.title}</h3>
      <p>{task?.description}</p>
      <p><strong>Status:</strong> <FontAwesomeIcon icon={task?.status === "Completed" ? faCheck : (task?.status === "Pending" ? faHourglass : faSpinner)} />
          {task?.status}</p>
      <p><strong>Due Date:</strong> {new Date(task?.due_date).toLocaleDateString()}</p>
      <div className="task-actions">
        <button onClick={handleEdit} className="edit-button">
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button onClick={handleDelete} className="delete-button">
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
        {
          (task?.status === "Completed") ? 
          <></>
          :
          <button onClick={handleChangeStatus} className="delete-button">
            <FontAwesomeIcon icon={(task?.status === "Completed") ? faHourglass :  (task?.status === "Pending" ? faSpinner: faCheck)} />
          </button>

        }
      </div>
    </div>
  );
};

export default TaskItem;
