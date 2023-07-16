import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config({ path: "/Users/falcacer/Workspace/Proyectos/playroom/SzicomProject/server/.env" });

export const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.PORT,
  })
  .promise();
