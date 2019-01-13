import db from "../services/connection";

export const create = (name, email) => {
    return new Promise((done, reject) => {
        var query = ` INSERT INTO task_contacts (name, email) 
        VALUES ('${name}', '${email}')`;
        console.log(query);
        db.run(query, {}, (error) => {
            if (error) {
                return reject(error)
            }
            done()
        });
    })
}

export const getContacts = () => {
    return new Promise((done, reject) => {
        let query = `SELECT * FROM task_contacts ORDER BY name ASC`;
        db.all(query, {}, (error, result) => {
            error ? reject(error) : done(result);
        });
    })
}

export const findById = _id => {
    return new Promise((done, reject) => {
        let query = `SELECT t.* FROM task_contacts t WHERE task_contact_id = ${_id}`;
        db.get(query, {}, (error, result) => {
            error ? reject(error) : done(result);
        });
    });
};

export const deleteById = _id => {
    return new Promise((done, reject) => {
        let query = `DELETE FROM task_contacts WHERE task_contact_id = ${_id}`;
        db.run(query, {}, (error) => {
            error ? reject(error) : done();
        });
    });
}

