import sqlLite3 from 'sqlite3';
import fs from "fs";
import path from "path"

const DATABASE_PATH = path.resolve(__dirname, "db.sqlite");
console.info("Database URL", DATABASE_PATH);
const db = new sqlLite3.Database("db.sqlite", sqlLite3.OPEN_READWRITE, (error) => {
    if (error) {
        console.error(error.message);
    } else {
        console.log('Connected to the chinook database.|');
    }
});

if(!fs.existsSync("db.sqlite")){
    console.info("Creating Database ....")
    db.serialize(() => {
        console.log("serialize")
        db.run(`
            CREATE TABLE tasks (
                task_id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name	TEXT NOT NULL,
                message	TEXT NOT NULL,
                cron_day	INTEGER NOT NULL,
                cron_date	NUMERIC NOT NULL
            );
        `, (error) => {
            console.log(error)
        });
        db.run(`
            CREATE TABLE settings (
                smtp_mail	TEXT NOT NULL,
                smtp_password	TEXT NOT NULL,
                version INTEGER NOT NULL DEFAULT 1
            );
        `);
        db.run(`
            CREATE TABLE task_products (
                task_product_id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name	TEXT NOT NULL,
                quantity TEXT NOT NULL
            );
        `);
        db.run(`
            CREATE TABLE task_contacts (
                task_contact_id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name	TEXT NOT NULL,
                email   TEXT NOT NULL
            );
        `)
    })
} else {
    console.info("Database Already Exists")
}



export default db;