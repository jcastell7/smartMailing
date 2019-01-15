import db from "../services/connection";

const create = (email, password) => {
  return new Promise((done, reject) => {
    let query = `INSERT INTO "settings" ("smtp_mail", "smtp_password") VALUES (?, ?)`;
    db.run(query, [email, password], error => {
      error ? (console.error(error), reject(error)) : done();
    });
  });
};

export const getConfig = () => {
  return new Promise((done, reject) => {
    let query = `SELECT t.* FROM settings t LIMIT 1`;
    db.get(query, {}, (error, res) => {
      error ? (console.error(error), reject(error)) : done(res);
    });
  });
};

const deleteConfig = () => {
  return new Promise((done, reject) => {
    let query = `DELETE FROM "settings"`;
    db.run(query, {}, error => {
      error ? (console.error(error), reject(error)) : done();
    });
  });
};

export const updateConfig = (email, password) => {
  return new Promise(async (done, reject) => {
    try {
      await deleteConfig();
      create(email, password).then(done());
    } catch (error) {
        console.error(error);
        reject(error);
    }
  });
};
