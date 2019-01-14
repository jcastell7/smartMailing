import db from "../services/connection";

export const create = (name, subject, message, cron_day, contacts, products) => {
  return new Promise((done, reject) => {
    try{
      storeTask(name, subject, message, cron_day).then(() => {
        getLastId().then((taskId)=> {
          console.log("taskId: ", taskId);
          storeContacts(taskId, contacts);
          storeProducts(taskId, products);
          done();
        });
      });
    }catch(error){
      reject();
    }
  });
};
const storeTask = (name, subject, message, cron_day) =>{
  return new Promise((done, reject) => {
    let date = new Date();
    let query = `INSERT INTO tasks (name, subject, message, cron_day, cron_date) 
                      VALUES (?, ?, ?, ?, ?)`;
    db.run( query, [name, subject, message, cron_day, date.toString()], error => {
        error ? (console.error(error), reject(error)) : done(); 
      });
  });
}

const storeContacts = (taskId, contacts) =>{
  return new Promise((done, reject) =>{
      contacts.forEach(item => {
  let contactQuery = `INSERT INTO contactsTasks (task_id, contact_id) VALUES (?, ?)`;
  db.run(contactQuery, [taskId.id, item], error => {
    error ? (console.log("query: ",contactQuery), console.error(error), reject(error)) : done();
  });
});
  });
}

const storeProducts = (taskId, products) => {
  return new Promise((done, reject) => {
    products.forEach(item => {
      let productQuery = `INSERT INTO productsTasks (task_id, product_id) VALUES (?, ?)`;
      db.run(productQuery, [taskId.id, item], error => {
        error ? (console.log("query: ",productQuery), console.error(error), reject(error)) : done();
      });
    });
  })
}


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
    let query = `SELECT t.* FROM tasks t WHERE id = ?`;
    db.get(query, [_id], (error, res) => {
      error ? (console.error(error), reject(error)) : done(res);
    });
  });
};

export const getTaskContactsById = _id =>{
  return new Promise((done, reject) => {
      let query = `SELECT t.id, c.contact_id FROM tasks AS t
      inner join contactsTasks as c on t.id = c.task_id
      WHERE id = ?`;
      db.all(query, [_id], (error, res) => {
        error ? (console.error(error), reject(error)) : done(res);
      });
  });
};

export const getTaskProductsById = _id => {
  return new Promise((done, reject) => {
      let query = `SELECT t.id, p.product_id FROM tasks AS t
      inner join productsTasks as p on t.id = p.task_id
      WHERE id = ?`;
      db.all(query, [_id], (error, res) => {
        error ? (console.error(error), reject(error)) : done(res);
      });
  });
}
export const getFullInfoById = _id => {
  return new Promise(async (done, reject) => {
    try{let task = await getById(_id);
      task.contacts = await getTaskContactsById(_id);
      task.products = await getTaskProductsById(_id);
      done(task);
    }catch (error){
      console.error(error);
      reject(error);
    }
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

export const editTaskById = (name, message, cron_day, subject, _id) => {
  return new Promise((done, reject) => {
    let query = `UPDATE "tasks" SET "name" = ?, "subject" = ?, "message" = ?, "cron_day" = ? WHERE "id" = ?`;
    db.run(query, [name, subject, message, cron_day, _id], error => {
      error ? (console.error(error), reject(error)) : done();
    });
  });
};

export const editContacts = (task_id , contacts) => {
  return new Promise((done, reject) => {
    let queryDelete = `DELETE FROM "contactsTasks" WHERE "task_id" = ?`
    db.run(queryDelete, [task_id], error =>{
      error ? (console.error(error), reject(error)) : (storeContacts(task_id,contacts).then(done()));
    })
  })
}

export const editProducts = (task_id , products) => {
  return new Promise((done, reject) => {
    let queryDelete = `DELETE FROM "productsTasks" WHERE "task_id" = ?`
    db.run(queryDelete, [task_id], error =>{
      error ? (console.error(error), reject(error)) : (storeProducts(task_id,products).then(done()));
    })
  })
}

export const getLastId = () => {
  return new Promise((done, reject) => {
    let query = `SELECT id from tasks order by id DESC limit 1`;
    db.get(query, {}, (error, res) => {
      error ? (console.error(error), reject(error)) : done(res);
    });
  });
};
