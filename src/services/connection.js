import sqlite3 from 'sqlite3';
import fs from "fs";
import path from "path"

const DATABASE_PATH = "smartMailing.db"//path.resolve(__dirname, "smartMailing.db");
console.info("Database URL", DATABASE_PATH);
const db = new sqlite3.Database(DATABASE_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
    console.log("this is the error message: ",error);
    if (error) {
        console.error(error.message);
    } else {
        console.log('Connected to the chinook database.|');
    }
});

if(!fs.existsSync(DATABASE_PATH)){
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