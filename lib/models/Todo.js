import pool from '../utils/pool.js'; 

export default class Todo {
  id;
  description;
  isCompleted;

  constructor(row) {
    this.id = row.todo_id;
    this.description = row.description;
    this.isCompleted = row.is_completed;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM todos'
    ); 
    return rows.map(row => new Todo(row)); 
  }

  static async insert(description, isCompleted) {
    const { rows } = await pool.query(
      `
        INSERT INTO todos (description, is_completed)
        VALUES($1, $2)
        RETURNING *
      `,
      [description, isCompleted]
    );
    return new Todo(rows[0]);
  }
}
