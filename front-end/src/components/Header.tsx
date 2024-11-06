import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Ensure you have appropriate styles

const Header = () => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark";
    });

    const toggleTheme = () => {
        setIsDarkTheme((prev) => !prev);
    };

    useEffect(() => {
        const theme = isDarkTheme ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [isDarkTheme]);

    return (
        <div className="header">
            <Link to="/" className="header-title">Tasky</Link>
            <div className="toggle-switch">
                <input
                    type="checkbox"
                    checked={isDarkTheme}
                    onChange={toggleTheme}
                    className="toggle-input"
                    id="theme-toggle" // Ensure this ID is unique and matches the label
                    aria-label={`Switch to ${isDarkTheme ? "light" : "dark"} mode`} // ARIA label for accessibility
                />
            </div>
        </div>
    );
};

export default Header;
