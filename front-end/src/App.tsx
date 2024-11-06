import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import MyTasks from './components/MyTasks';
import AllTasks from './components/AllTasks';
import Header from './components/Header';
import ContactForm from './components/Footer';


const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks/my" element={<MyTasks />} />
          <Route path="/tasks" element={<AllTasks />} />
        </Routes>
        <ContactForm />
      </Router>
    </div>
  );
};

export default App;
