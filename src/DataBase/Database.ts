import mysql from "mysql";

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

  static async query(sqlQuery: string, values?: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (values === undefined) {
        this.conn.query(sqlQuery, (err, result) => {
          if (err) {
            reject(Database.reject(err));
          } else {
            resolve(result);
          }
        });
      } else {
        this.conn.query(sqlQuery, values, (err, result) => {
          if (err) {
            reject(Database.reject(err));
          } else {
            resolve(result);
          }
        });
      }
    });
  }

  static reject(error): boolean{
    console.log(error);
    return false;
  }

}
