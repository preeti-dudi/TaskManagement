import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faCalendarAlt, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const HomePage: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>
                Introducing <span style={styles.appName}>Tasky</span>: Simplify Your To-Do List
            </h1>
            <p style={styles.paragraph}>
                Life can get busy, and keeping track of everything can feel overwhelming. That’s where <span style={styles.appName}>Tasky</span> comes in—a simple, user-friendly task management app designed to help you stay organized without the stress. Whether you’re juggling work projects, managing personal errands, or planning a big event, <span style={styles.appName}>Tasky</span> makes it easy to keep everything in one place.
            </p>
            <div style={styles.iconSection}>
                <div style={styles.iconContainer}>
                    <FontAwesomeIcon icon={faTasks} size="2x" style={styles.icon} />
                    <p>Effortlessly Add Tasks</p>
                </div>
                <div style={styles.iconContainer}>
                    <FontAwesomeIcon icon={faCalendarAlt} size="2x" style={styles.icon} />
                    <p>Sort by Deadline</p>
                </div>
                <div style={styles.iconContainer}>
                    <FontAwesomeIcon icon={faClipboardList} size="2x" style={styles.icon} />
                    <p>View and Manage Tasks</p>
                </div>
            </div>
            <p style={styles.paragraph}>
                Say goodbye to cluttered sticky notes and forgotten tasks. With <span style={styles.appName}>Tasky</span>, staying on top of your day is just a tap away. Ready to get organized? Let’s do this together!
            </p>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        textAlign: 'center',
        padding: '2rem',
        // maxWidth: '800px',
        margin: '0 auto',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '20px',
    },
    appName: {
        color: '#007bff',
    },
    paragraph: {
        fontSize: '1.2rem',
        marginBottom: '20px',
        lineHeight: '1.6',
    },
    iconSection: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '30px',
    },
    iconContainer: {
        textAlign: 'center',
        backgroundColor: '#fff',
    },
    icon: {
        color: '#007bff',
        marginBottom: '10px',
    },
};

export default HomePage;
