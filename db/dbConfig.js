import mysql from "mysql2";

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@root',
    database: 'mydb'
});

export default pool;