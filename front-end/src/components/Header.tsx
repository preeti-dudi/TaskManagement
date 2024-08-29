import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [authenticated,setAuthenticated] = useState(false);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticated(true);
        }
    },[]);

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            setAuthenticated(false);
            window.location.href="/login";
            alert('Logged out successfully!');
        } catch (error) {
            alert('Logout failed!');
        }
    };

    return (
        <div className="header">
            <div className="header-title">Tasky</div>
            {
                authenticated ?
                <div className="navbar">
                    <Link to="/tasks" className="nav-link">My Tasks</Link>
                    <button onClick={handleLogout} className="nav-link">Logout</button>
                </div>
                :
                <div className="navbar">
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-link">Register</Link>
                </div>
            }
        </div>
    );
};

export default Header;
