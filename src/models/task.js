import db from "../services/connection";

export const create = (name, subject, message, cron_day, contacts, products) => {
  return new Promise((done, reject) => {
    let date = new Date();
    let query = `INSERT INTO tasks (name, subject, message, cron_day, cron_date) 
                      VALUES (?, ?, ?, ?, ?)`;
    db.run( query, [name, subject, message, cron_day, date.toString()], error => {
        error ? (console.error(error), reject(error)) : async () => {
              let taskId = await getLastId();
              contacts.forEach(item => {
                let contactQuery = `INSERT INTO contactsTasks (task_id, contact_id) VALUES (?, ?)`;
                db.run(contactQuery, [taskId, item], error => {
                  error ? (console.error(error), reject(error)) : "";
                });
              });
              products.forEach(item => {
                let contactQuery = `INSERT INTO productsTasks (task_id, contact_id) VALUES (?, ?)`;
                db.run(contactQuery, [taskId, item], error => {
                  error ? (console.error(error), reject(error)) : done();
                });
              });
            };
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
    let query = `SELECT t.* FROM task AS t WHERE id = ?`;
    db.get(query, [_id], (error, res) => {
      error ? (console.error(error), reject(error)) : done(res);
    });
  });
};

export const deleteById = _id => {
  return new Promise((done, reject) => {
    let query = `DELETE FROM "tasks" WHERE "id" = ?`;
    db.run(query, [_id], error => {
      error ? (console.error(error), reject(error)) : done();
    });
  });
};

export const editTaskById = (
  name,
  message,
  cron_day,
  cron_date,
  subject,
  _id
) => {
  return new Promise((done, reject) => {
    let query = ` UPDATE "tasks" SET "name" = ?, "message" = ?, "cron_day" = ?, "subject" = ?, cron_date" = ? WHERE "id" = ? `;
    db.run(query, [name, message, cron_day, subject, cron_date, _id], error => {
      error ? (console.error(error), reject(error)) : done();
    });
  });
};

export const getLastId = () => {
  return new Promise((done, reject) => {
    let query = `SELECT id from tasks order by id DESC limit 1`;
    db.get(query, {}, (error, res) => {
      error ? (console.error(error), reject(error)) : done(res);
    });
  });
};
