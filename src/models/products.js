import connection from "../services/connection";

export const createProduct = (productName, quantity) => {
  return new Promise((done, reject) => {
    let query = `INSERT INTO "task_products" ("name", "quantity") VALUES ('?', '?')`;
    connection.db.run(query, [productName, quantity], error => {
      error ? reject(error) : done();
    });
  });
};

export const findById = _id => {
  return new Promise((done, reject) => {
    let query = `SELECT t.* FROM task_products t
    WHERE task_product_id = "?"`;
    connection.db.run(query, [_id], error => {
      error ? reject(error) : done();
    });
  });
};

export const deleteById = _id => {
  return new Promise((done, reject) => {
    let query = `DELETE FROM "task_products" WHERE "task_product_id" = ?`;
    connection.db.run(query, [_id], error => {
      error ? reject(error) : done();
    });
  });
};