Project: Task Management System Objective:

Build a Task Management System where users can create, read, update, and
delete tasks. Each task should have a title, description, status, and due
date. Users should be able to register, log in, and manage their tasks.
Requirements: Frontend (React + TypeScript):

1. Authentication Pages: Create login and registration pages.
2. Task Dashboard: Display a list of tasks.
3. Task Management:
- Add a new task.
- Edit an existing task.
- Delete a task.
- Mark a task as completed.
4. Responsive Design: Ensure the application is responsive and works on
various devices (only mobile and desktop, tablet not required).

Backend (Node.js + TypeScript):

1. Authentication:
- Implement JWT-based authentication.
- Create endpoints for user registration and login.


- Refresh Token Mechanism should be implemented for persistent sessions.


2. Task Endpoints:
- Create CRUD (Create, Read, Update, Delete) endpoints for tasks.
3. Database Schema:
- Design a SQL schema for users and tasks.
- Implement the schema using a relational database (e.g., PostgreSQL or
MySQL).

Advanced Concepts:

1. Frontend:
- Use React Hooks effectively.
- Apply TypeScript interfaces and types for props and state.
2. Backend:
- Implement request validation and error handling.
- Use TypeScript for type safety in your backend code.
- Set up environment variables for configuration.
3. Database:
- Use transactions where necessary.
- Optimize queries for performance.
- Implement indexing for faster data retrieval (optional).

Steps to Complete the Assignment:

1. Setup Environment:
- Initialize a new Node.js project and set up TypeScript.
- Initialize a new React project with TypeScript.
2. Design Database Schema:
- Create tables for users and tasks.
- Define relationships and constraints.
3. Backend Development:
- Set up Express server.
- Implement authentication endpoints.
- Implement task CRUD endpoints.
- Use a database client (e.g., Sequelize, TypeORM) to interact with the
SQL database.
4. Frontend Development:
- Set up React project structure.
- Create authentication pages (login and registration).
- Create components for task management (list, add, edit, delete).
- Connect frontend with backend using Axios or Fetch API.
5. Advanced Features:
- Add request validation and error handling in the backend.
- Implement responsive design in the frontend.
- Optimize database queries and apply indexing (optional).
6. Testing and Deployment **(optional):


- Write unit tests for both frontend and backend (Optional but has
weightage when evaluating)..


- Deploy the application using a service like Heroku, Vercel, or
Netlify.

Deliverables:

- Source code for both frontend and backend.
- A README file with setup instructions.
- Deployed application URL (optional).
