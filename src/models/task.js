import db from "../services/connection";

export const create = (name, message, cron_day) => {
  return new Promise((done, reject) => {
    let date = new Date();
    let query = `INSERT INTO tasks (name, message, cron_day, cron_date) 
                      VALUES (?, ?, ?, ?)`;
    db.run(query, [name, message, cron_day, date.toString()], error => {
      error ? (console.error(error), reject(error)) : done();
    });
  });
};

export const getTasks = () => {
  return new Promise((done, reject) => {
    let query = `SELECT t.* FROM tasks t`;
    db.all(query, {}, (error, res) => {
      error ? (console.error(error), reject(error)) : done(res);
    });
  });
};

export const getById = _id => {
  return new Promise((done, reject) => {
    let query = `SELECT t.* FROM task AS t WHERE task_id = ?`;
    db.get(query, [_id], (error, res) => {
      error ? (console.error(error), reject(error)) : done(res);
    });
  });
};

export const deleteById = _id => {
  return new Promise((done, reject) => {
    let query = `DELETE FROM "tasks" WHERE "task_id" = ?`;
    db.run(query, [_id], error => {
      error ? (console.error(error), reject(error)) : done();
    });
  });
};

export const editTaskById = (name, message, cron_day, cron_date, _id) => {
  return new Promise((done, reject) => {
    let query = ` UPDATE "tasks" SET "name" = ?, "message" = ?, "cron_day" = ?, "cron_date" = ? WHERE "task_id" = ? `;
    db.run(query, [name, message, cron_day, cron_date, _id], error => {
      error ? (console.error(error), reject(error)) : done();
    });
  });
};
