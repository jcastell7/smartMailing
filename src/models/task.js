import db from "../services/connection";

export const createTask = (name, message, cron_day) => {
  return new Promise((done, reject) => {
    let date = new Date();
    let query = `INSERT INTO tasks (name, message, cron_day, cron_date) 
                      VALUES ('?', '?', ?, '?')`;
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
