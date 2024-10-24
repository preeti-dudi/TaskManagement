import React, { useEffect, useState } from "react";
import { List, Typography } from "antd";
import dayjs from "dayjs";
import TaskCard from "./TaskCard";
import './MyTasks.css';

const MyTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [todayTasks, setTodayTasks] = useState<any[]>([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
    filterTodayTasks(storedTasks);
  }, []);

  const filterTodayTasks = (storedTasks: any[]) => {
    const today = dayjs().format("YYYY-MM-DD");
    const filteredTasks = storedTasks.filter((task) => {
      const {
        scheduledDate,
        isRepeat,
        repeatFrequency,
        selectedWeekdays,
        selectedDaysOfMonth,
        selectedYears,
      } = task;

      if (scheduledDate === today) return true;

      if (isRepeat) {
        switch (repeatFrequency) {
          case "everyday":
            return true;
          case "weekly":
            const todayWeekday = dayjs().format("dddd");
            return selectedWeekdays.includes(todayWeekday);
          case "monthly":
            const todayDate = dayjs().date();
            return selectedDaysOfMonth.includes(todayDate);
          case "yearly":
            const todayMonth = dayjs().month() + 1;
            return selectedYears.includes(todayMonth);
          default:
            return false;
        }
      }

      return false;
    });

    setTodayTasks(filteredTasks);
  };

  const deleteTask = (taskToDelete: any) => {
    const updatedTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(updatedTasks);
    setTodayTasks(todayTasks.filter((task) => task !== taskToDelete));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const editTask = (specificTask: any) => {
    const updatedTasks = tasks.map((task) =>
      task.id === specificTask.id ? specificTask : task
    );
    setTasks(updatedTasks);
    filterTodayTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="my-tasks-container">
      {todayTasks.length === 0 ? (
        <>

          <Typography.Title level={3}>Today's Tasks</Typography.Title>
          <Typography.Text>No tasks scheduled for today.</Typography.Text>
        </>
      ) : (
        <List

          header={
            <Typography.Title level={3} style={{ color: 'inherit' }} >Today's Tasks</Typography.Title>
          }
          dataSource={todayTasks}
          className="task-list" 
          renderItem={(task) => (
            <List.Item>
              <TaskCard key={task.id} task={task} editTask={editTask} deleteTask={deleteTask} />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default MyTasks;
