import mysql from "mysql";
import { Logger } from "../Logger";

const logger = new Logger("databaseErr.txt");

export class Database {
  static conn: any;

  static connect(
    host: string,
    user: string,
    password: string,
    database: string
  ) {
    Database.conn = mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
    });

    Database.conn.connect(function (err) {
      if (err) throw err;
      console.log("Connected To DataBase!");
    });
  }

  static async query(sqlQuery: string, values? : any[]) {
    if(values === undefined){
      await this.conn.query(sqlQuery, values, (err, result) => {
        return err ? Database.reject(err) : result.insertId;
      });
    }
    await this.conn.query(sqlQuery, (err, result) => {
      return err ? Database.reject(err) : result.insertId;
    });
  }

  static reject(error): boolean{
    logger.log(error);
    return false;
  }

}
