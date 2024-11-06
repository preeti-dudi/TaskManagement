import React from 'react';
import * as Icons from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import { title } from 'process';

const Home: React.FC = () => {

  const features : Array<{ title: string, description: string, icon: keyof typeof Icons }> = [
    { title: "Customizable Color Themes", description: "Personalize tasks with light and dark complementary color options, adapting to your theme preference.", icon: "BgColorsOutlined" },
    { title: "Dynamic Icon Selection", description: "Choose from a wide range of icons to represent each task, adding a unique visual touch to your schedule.", icon: "AppstoreAddOutlined" },
    { title: "Flexible Repeat Options", description: "Tailor recurring tasks to your exact needs with options for daily, weekly, monthly, and yearly repeats.", icon: "ReloadOutlined" },
    { title: "Smart Scheduling", description: "Specify dates and times with ease, with automatic validation for past dates to ensure future-ready planning.", icon: "CalendarOutlined" },
    { title: "Subtask Management", description: "Break down tasks into manageable subtasks with simple addition and removal functions, keeping you organized and on track.", icon: "ProfileOutlined" }];

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
          {features.map(({ title, description, icon }, index) => {
            const IconComponent = Icons[icon] as React.FC;
            return (
              <div className="feature-item">
                <span
                  className="feature-icon"
                >
                  <IconComponent />
                </span>
                <span>
                  <h3>{title}</h3>
                  <p>{description}</p>

                </span>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default Home;
