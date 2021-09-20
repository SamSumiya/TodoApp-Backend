import { Router } from 'express';
import Todo from '../models/Todo.js';

export default Router()
  .get('/', async (req, res, next) => {
    try {
      const todos = await Todo.getAll();
      res.send(todos);
    } catch(error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await Todo.getById(id); 
      res.send(response);
    } catch(error) {
      next(error); 
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const { description, isCompleted } = req.body;
      const todo = await Todo.insert(description, isCompleted);
      res.send(todo);
    } catch(error) {
      next(error);
    }
  });
