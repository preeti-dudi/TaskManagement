import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faClock, faChartLine, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home: React.FC = () => {
  return (
    <div className="home-container">
      {/* Welcome section */}
      <div className="welcome-section">
        <h1>🎉 Welcome to Tasky!</h1>
        <p>
          Simplify your tasks, track your progress, and achieve more. Tasky helps you stay organized and productive with ease.
        </p>
        <Link to="/tasks" className="get-started-btn">
          Get Started Now 🚀
        </Link>
      </div>

      {/* Features section with icons */}
      <div className="features-section">
        <h2>✨ Why Choose Tasky?</h2>
        <div className="features-list">
          <div className="feature-item">
            <FontAwesomeIcon icon={faTasks} className="feature-icon" />
            <span>Effortlessly organize and manage your tasks</span>
          </div>
          <div className="feature-item">
            <FontAwesomeIcon icon={faClock} className="feature-icon" />
            <span>Stay on top of deadlines with smart reminders</span>
          </div>
          <div className="feature-item">
            <FontAwesomeIcon icon={faChartLine} className="feature-icon" />
            <span>Monitor your productivity with progress tracking</span>
          </div>
          <div className="feature-item">
            <FontAwesomeIcon icon={faUserCheck} className="feature-icon" />
            <span>Collaborate seamlessly with your team</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
