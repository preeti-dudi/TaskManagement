import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import errorHandler from './middleware/errorHandler';
// import path from 'path';
import { setupSwagger } from './config/swagger';

dotenv.config();

const app = express();


setupSwagger(app);


// const corsOptions = {
//   origin: 'http://localhost:3000',
//   //  'https://task-management-black-two.vercel.app/',
//   credentials: true,
//   optionsSuccessStatus: 200
// };

app.use(cors());

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

export default app;
