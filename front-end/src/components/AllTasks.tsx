import React, { useEffect, useState } from 'react';
import { Button, List, Modal, Typography } from 'antd';
import TaskForm from './TaskForm';
import { Task } from './TaskTypes';
import TaskCard from './TaskCard';
import './AllTasks.css'; // Import the CSS file for styling

const AllTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);

  // Function to handle adding a new task
  const addTask = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setIsFormVisible(false);
  };

  // Function to handle editing a task
  const editTask = (specificTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === specificTask.id ? specificTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Function to handle deleting a task
  const deleteTask = (taskId: string | null) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Function to handle closing the form modal
  const handleCancel = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      {/* Task Modal for Adding/Editing Tasks */}
      <Modal
        title= "Add Task"
        open={isFormVisible}
        onCancel={handleCancel}
        footer={null}
        className="task-modal" // Add a custom class for styling
      >
        {/* Show TaskForm for adding/editing */}
        {isFormVisible && <TaskForm taskToEdit={null} onSubmit={addTask} />}
      </Modal>

      {/* Task List with Grid Layout and Add Button */}
      <List
        header={
          <div style={{ color: 'inherit' }} className='space-between'>
            <Typography.Title level={3} style={{ color: 'inherit' }} >Your Tasks</Typography.Title>
              <Button
                type="primary"
                onClick={() => setIsFormVisible(true)}
                disabled={isFormVisible}
              >
                Add New Task
              </Button>
          </div>
        }
        className="task-list" // Add a custom class for styling
        grid={{
          gutter: 10, // Space between grid items
          xs: 1,      // 1 item per row on extra small screens
          sm: 2,      // 2 items per row on small screens
          md: 3,      // 3 items per row on medium screens
          lg: 4,      // 4 items per row on large screens
          xl: 4,      // 4 items per row on extra-large screens
          xxl: 5,     // 6 items per row on extra-extra-large screens
        }}
        renderItem={(task) => {
          return (
            <List.Item>
              <TaskCard key={task.id} task={task} editTask={editTask} deleteTask={deleteTask} />
            </List.Item>
          );
        }}
        dataSource={tasks}
        
      />
    </div>
  );
};

export default AllTasks;
