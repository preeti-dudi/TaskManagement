import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import TaskList from './components/tasks/TaskList';
import AddTask from './components/tasks/AddTask';
import './App.css';
import Header from './components/Header';
import UpdateTask from './components/tasks/UpdateTask';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/add" element={<AddTask />} />
          <Route path="/tasks/edit/:id" element={<UpdateTask />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
