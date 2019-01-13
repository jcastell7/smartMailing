import db from "../services/connection";

export const createProduct = (productName, quantity) => {
  return new Promise((done, reject) => {
    let query = `INSERT INTO "task_products" ("name", "quantity") VALUES ('?', '?')`;
    db.run(query, [productName, quantity], (error, res) => {
      error ? (console.error(error), reject(error)) : done(res);
    });
  });
};

export const findById = _id => {
  return new Promise((done, reject) => {
    let query = `SELECT t.* FROM task_products t
    WHERE task_product_id = "?"`;
    db.get(query, [_id], (error, res) => {
      error ? (console.error(error), reject(error)) : done(res);
    });
  });
};

export const deleteById = _id => {
  return new Promise((done, reject) => {
    let query = `DELETE FROM "task_products" WHERE "task_product_id" = ?`;
    db.run(query, [_id], error => {
      error ? (console.error(error), reject(error)) : done();
    });
  });
};