import { promises as fs } from 'fs';

export default (pool) => {
  return fs.readFile('./sql/setup.sql', { encoding: 'utf-8' })
    .then(sql => pool.query(sql));
};
