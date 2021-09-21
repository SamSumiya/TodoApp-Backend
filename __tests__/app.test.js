import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Todo from '../lib/models/Todo';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('get a list of todos', async () => {
    const todo1 = {
      description: 'This is my first todo for tomorrow',
      isCompleted: false,
    };
    const todo2 = {
      description: 'This is my first finished todo for today',
      isCompleted: true,
    };
    await Todo.insert(todo1.description, todo1.isCompleted);
    await Todo.insert(todo2.description, todo2.isCompleted);
    const todos = await request(app).get('/api/v1/todos');
    expect(todos.body).toEqual([
      {
        id: '1',
        ...todo1,
      },
      {
        id: '2',
        ...todo2,
      },
    ]);
  });
});
