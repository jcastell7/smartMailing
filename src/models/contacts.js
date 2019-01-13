import db from "../services/connection";

export const create = (name, email) => {
  return new Promise((done, reject) => {
    let query = ` INSERT INTO task_contacts (name, email) 
        VALUES (?, ?)`;
    db.run(query, [name, email], error => {
      error ? (console.error(error), reject(error)) : done();
    });
  });
};

export const getContacts = () => {
  return new Promise((done, reject) => {
    let query = `SELECT * FROM task_contacts ORDER BY name ASC`;
    db.all(query, {}, (error, result) => {
      error ? (console.error(error), reject(error)) : done(result);
    });
  });
};

export const findById = _id => {
  return new Promise((done, reject) => {
    let query = `SELECT t.* FROM task_contacts t WHERE task_contact_id = ?`;
    db.get(query, [_id], (error, result) => {
      error ? (console.error(error), reject(error)) : done(result);
    });
  });
};

export const deleteById = _id => {
  return new Promise((done, reject) => {
    let query = `DELETE FROM task_contacts WHERE task_contact_id = ?`;
    db.run(query, [_id], error => {
      error ? (console.error(error), reject(error)) : done();
    });
  });
};

export const editById = (_id, name, email) => {
  return new Promise((done, reject) => {
    let query = `UPDATE "task_contacts" SET "name" = ?, "email" = ? WHERE "task_contact_id" = ?`;
    db.run(query, [name, email, _id], error => {
      error ? (console.error(error), reject(error)) : done();
    });
  });
};
