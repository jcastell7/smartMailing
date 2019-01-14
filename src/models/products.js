import db from "../services/connection";

export const create = (productName, quantity) => {
  return new Promise((done, reject) => {
    let query = `INSERT INTO "task_products" ("name", "quantity") VALUES (?, ?)`;
    db.run(query, [productName, quantity], (error, res) => {
      error ? (console.error(error), reject(error)) : done(res);
    });
  });
};

export const findById = _id => {
  return new Promise((done, reject) => {
    let query = `SELECT t.* FROM task_products t
    WHERE id = ?`;
    db.get(query, [_id], (error, res) => {
      error ? (console.error(error), reject(error)) : done(res);
    });
  });
};

export const deleteById = _id => {
  return new Promise((done, reject) => {
    let query = `DELETE FROM "task_products" WHERE "id" = ?`;
    db.run(query, [_id], error => {
      error ? (console.error(error), reject(error)) : done();
    });
  });
};

export const getProducts = () => {
  return new Promise((done, reject) => {
    let query = `SELECT t.* FROM task_products AS t`;
    db.all(query, {}, (error, res) => {
      error ? (console.error(error), reject(error)) : done(res);
    });
  });
};

export const editById = (_id, name, quantity) => {
  return new Promise((done, reject) => {
    let query = `UPDATE "task_products" SET "name" = ?, "quantity" = ? WHERE "id" = ?`;
    db.run(query, [name, quantity, _id], error => {
      error ? (console.error(error), reject(error)) : done();
    });
  });
};

export const getLastId = () => {
  return new Promise((done, reject) => {
    let query = `SELECT id from task_products order by id DESC limit 1 `;
    db.get(query, {}, (error, res) => {
      error ? (console.error(error), reject(error)) : done(res);
    });
  })
};