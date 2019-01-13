import db from "./connection";

export const createTask = (name, message, cron_day) => {
    let date = new Date()
    var sql = `INSERT INTO tasks (name, message, cron_day, cron_date) 
                VALUES ('${name}', '${message}', ${cron_day}, '${date.toString()}')`;
    console.log(sql);
    db.run(sql, {}, (error)=>{
                console.error(error)
            });
}

export const getTasks = () => {

}


