import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Popconfirm, Tag, Typography } from 'antd';
import * as Icons from '@ant-design/icons';
import { Task } from './TaskTypes';
import TaskForm from './TaskForm';

interface TaskCardProps {
    task: Task;
    deleteTask: (taskId: string | null) => void;
    editTask: (task: Task) => void;
}


const TaskCard: React.FC<TaskCardProps> = ({ task, deleteTask, editTask }) => {
    // Dynamically select the icon component from the @ant-design/icons library
    const IconComponent = task.icon ? Icons[task.icon.name] as React.FC : null;
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    // Function to handle closing the form modal
    const handleCancel = () => {
        setIsFormVisible(false);
    };
    const handleEditTask = (task: Task) => {
        editTask(task)
        setIsFormVisible(false);
    }

    return (
        <>

            <Modal
                title="Edit Task"
                open={isFormVisible}
                onCancel={handleCancel}
                footer={null}
                className="task-modal" // Add a custom class for styling
            >
                <TaskForm taskToEdit={task} onSubmit={handleEditTask} />
            </Modal>

            <Card
                title={task.title}
                style={{  backgroundColor: task.color.lightTheme, marginBottom: '20px', borderRadius: '10px', padding: '16px' }}
                extra={
                    <div>
                        {
                            task.icon && IconComponent && (
                                <span style={{ fontSize: '32px', color: task.icon.color, marginRight: '10px' }} >
                                    <IconComponent />
                                </span>
                            )
                        }
                        <Button icon={<Icons.EditOutlined />} onClick={() => setIsFormVisible(true)}>

                        </Button>
                        <Popconfirm
                            title="Are you sure you want to delete this task?"
                            onConfirm={() => deleteTask(task.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button icon={<Icons.DeleteOutlined />}>
                            </Button>
                        </Popconfirm>
                    </div>
                }

            >

                <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        {/* Task Tag */}
                        {task.tag && (
                            <Tag color="blue" style={{ fontSize: '14px', marginBottom: '10px' }}>
                                {task.tag}
                            </Tag>
                        )}
                    </div>

                    {/* Scheduled Date and Time */}
                    {task.scheduledDate && (
                        <div style={{ marginBottom: '10px' }}>
                            <Typography.Text strong>Scheduled Date:</Typography.Text>{' '}
                            <Typography.Text>{task.scheduledDate}</Typography.Text>
                        </div>
                    )}

                    {/* Specific Time */}
                    {task.specificTime && (
                        <div style={{ marginBottom: '10px' }}>
                            <Typography.Text strong>Time:</Typography.Text>{' '}
                            <Typography.Text>
                                {typeof task.specificTime === 'boolean' && task.specificTime === true
                                    ? 'All Day'
                                    : Array.isArray(task.specificTime)
                                        ? task.specificTime.join(', ')
                                        : task.specificTime}
                            </Typography.Text>
                        </div>
                    )}

                    {/* Repeat Information */}
                    {task.isRepeat && (
                        <div style={{ marginBottom: '10px' }}>
                            <Typography.Text strong>Repeats:</Typography.Text>{' '}
                            <Typography.Text>{task.repeatFrequency}</Typography.Text>
                        </div>
                    )}

                    {/* Subtasks */}
                    {task.subtasks.length > 0 && (
                        <div style={{ marginBottom: '10px' }}>
                            <Typography.Text strong>Subtasks:</Typography.Text>
                            <ul>
                                {task.subtasks.map((subtask, index) => (
                                    <li key={index}>
                                        <Typography.Text>{subtask}</Typography.Text>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Reminder */}
                    {task.reminder && (
                        <div style={{ marginBottom: '10px' }}>
                            <Typography.Text strong>Reminder Set:</Typography.Text>{' '}
                            <Typography.Text type="success">Yes</Typography.Text>
                        </div>
                    )}
                </div>
            </Card>
        </>
    );
};

export default TaskCard;
