import connection from "../services/connection";

function createProduct(productName, quantity) {
  let query = `INSERT INTO "task_products" ("name", "quantity") VALUES ('?', '?')`;
  connection.db.run(query, [productName, quantity]);
}

function findById(_id) {
  let query = `SELECT t.* FROM task_products t
    WHERE task_product_id = "?"`;
  connection.db.run(query, [_id]);
}

function deleteById(_id) {
  let query = `DELETE FROM "task_products" WHERE "task_product_id" = ?`;
  connection.db.run(query, [_id]);
}

export default createProduct;
export default findById;
export default deleteById;