import db from "../services/connection";

export const create = (name, email) => {
    return new Promise((done, reject) => {
        var sql = ` INSERT INTO task_contacts (name, email) 
        VALUES ('${name}', '${email}')`;
        console.log(sql);
        db.run(sql, {}, (error) => {
            if (error) {
                return reject(error)
            }
            done()
        });
    })
}
