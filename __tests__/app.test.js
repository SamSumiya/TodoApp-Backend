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

  it('Test get by id to see if I can selected a todo by passing id', async () => {
    const todo = {
      description: 'Get by id todo', 
      isCompleted: false, 
    }
    const insertedTodo = await Todo.insert(todo.description, todo.isCompleted); 
    const selectedTodo = await request(app).get(`/api/v1/todos/${insertedTodo.id}`)
    expect(selectedTodo.body).toEqual({
      id: "1", 
      ...todo, 
    })
  }); 

  it('Test post by if to see if I can post a new todo', async () => {
    const todo = {
      description: 'This is a new todo that I just posted',
      isCompleted: false,
    };
    
    const newTodo = await request(app)
      .post('/api/v1/todos')
      .send(todo); 
    console.log(newTodo.body)
  })
});
