import express from 'express';
import cors from 'cors';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import todosController from './controllers/todos.js';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use('/api/v1/todos', todosController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
