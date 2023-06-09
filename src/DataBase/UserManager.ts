import { Database } from "./Database";

export class UserManager {
  //  //\\ //\\ //\\
  async addUser(
    firstName: string,
    lastName: string,
    email: string,
    permissionLevel: number,
    password: string,
    infix?: string
  ) {
    let sqlQuery: string;
    if(infix === undefined){
        sqlQuery = `INSERT INTO users (firstName,lastName,email,permissionLevel,password) VALUES (${firstName},${lastName},${email},${permissionLevel},${password})`
    }else{
        sqlQuery = `INSERT INTO users (firstName,infix,lastName,email,permissionLevel,password) VALUES (${firstName},${infix},${lastName},${email},${permissionLevel},${password})`
    }

    return await Database.query(sqlQuery);
  }
  //  \\// \\// \\//

  //  //\\ //\\ //\\
  async deleteUser(id: number) {
    const sqlQuery = `Delete FROM users WHERE id = ${id}`

    return await Database.conn.query(sqlQuery);
  }
  //  //\\ //\\ //\\
  async modifyUser(id: number, permissionLevel: number);
  async modifyUser(id: number, firstName: string, infix: string, lastName: string);
  async modifyUser(id: number, password: string);
  async modifyUser(id: number, email: string);
  async modifyUser(id: number, gender: number);
  async modifyUser(id: number, isSick: boolean);
  async modifyUser(id: number, arg1?: any, arg2?: any, arg3?: any) {

    let sqlQuery: string;
    if (typeof arg1 === "number" && typeof arg2 === "number") {
      // modifyUser(id: number, permissionLevel: number) implementation
      sqlQuery = `UPDATE users SET permissionLevel = ${arg1} WHERE id = ${id} `
    } else if (typeof arg1 === "number" && typeof arg2 === "string" && typeof arg3 === "string") {
      // modifyUser(id: number, firstName: string, infix: string, lastName: string) implementation
      sqlQuery = `UPDATE users SET firstname = "${arg1}", infix = "${arg2}", lastName = "${arg3}" WHERE id = ${id} `
    } else if (typeof arg1 === "number" && typeof arg2 === "string") {
      // modifyUser(id: number, password: string) implementation
      sqlQuery = `UPDATE users SET password = "${arg1}" WHERE id = ${id} `
    } else if (typeof arg1 === "number" && typeof arg2 === "string") {
      // modifyUser(id: number, email: string) implementation
      sqlQuery = `UPDATE users SET email = "${arg1}" WHERE id = ${id} `
    } else if (typeof arg1 === "number" && typeof arg2 === "number") {
      // modifyUser(id: number, gender: number) implementation
      sqlQuery = `UPDATE users SET gender = ${arg1} WHERE id = ${id} `
    } else if (typeof arg1 === "number" && typeof arg2 === "boolean") {
      // modifyUser(id: number, isSick: boolean) implementation
      sqlQuery = `UPDATE users SET isSick = ${arg1} WHERE id = ${id} `
    }

    return await Database.query(sqlQuery);
  }

  //  \\// \\// \\//

  //  //\\ //\\ //\\
  async getUser(id: number);
  async getUser(email: string);
  async getUser(
    firstName: string,
    infix: string,
    lastName: string
  );
  async getUser(firstName: string, lastName: string);
  async getUser(arg1: any, arg2?: string, arg3?: string) {
    let sqlQuery: string;

    if (arg2 !== undefined && arg3 !== undefined) {
      sqlQuery = `SELECT * FROM users WHERE firstName = "${arg1}" AND infix = "${arg2}" AND lastName = "${arg3}"`;
    } else if (arg2 !== undefined) {
      sqlQuery = `SELECT * FROM users WHERE firstName = "${arg1}" AND lastName = "${arg2}"`;
    }
    if (arg1 instanceof Number) {
      sqlQuery = `SELECT * FROM users WHERE id = ${arg1}`;
    } else if (arg1 instanceof String) {
      sqlQuery = `SELECT * FROM users WHERE email = "${arg1}" `;
    }

    return await Database.query(sqlQuery);
  }
  //  \\// \\// \\//

  async addLessonToUser(userId : number, lessonId: number){
    const sqlQuery = `INSERT INTO userLessons (user_id,lesson_id) VALUES (${userId},${lessonId})`;

    return await Database.query(sqlQuery);
  }

  async getUserLessonIds(id : number){
    const sqlQuery = `Select * FROM userLessons WHERE user_id = ${id}`;

    return await Database.query(sqlQuery);
  }

  async addSubscription(id : number, subscriptionLevel : number){
    const currentDate = new Date();
    const sqlQuery = `INSERT INTO subscriptions (user_id,subscriptionLevel,startDate) VALUES (${id},${subscriptionLevel},${currentDate.toISOString()})`

    return await Database.query(sqlQuery);
  }

  async getSubscription(id : number){
    const sqlQuery = `Select * FROM subscriptions WHERE user_id = ${id}`

    return await Database.query(sqlQuery);
  }

  async deleteSubsciption(id : number){
    const sqlQuery = `Delete FROM subscriptions WHERE user_id = ${id}`

    return await Database.query(sqlQuery);
  }

  async modifySubscription(id : number, subType : number, lessonsUsed : number){
    const sqlQuery = `UPDATE subscriptions SET subscriptionLevel = ${subType}, lessonsUsed = ${lessonsUsed} WHERE user_id = ${id}`
    
    return await Database.query(sqlQuery);
  }
}
