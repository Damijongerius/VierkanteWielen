import session from "express-session";
import { redisClient } from "../App";
import { Request, Response } from "express";
import { Database } from "../../dist/DataBase.js";

export class Lesson {
  async Add(req: Request, res: Response) {
    if(await hasPermissions(req.session.id) == false){ res.render("/rooster") };
    
    const lesson = req.body;
    lesson.date: Date,
    lesson.student_name: string,
    lesson.examen: int,
    lesson.description: string,
    lesson.goal: string,
    lesson.pickup: string,

  }
}

// async addUser(
//   firstName: string,
//   lastName: string,
//   email: string,
//   permissionLevel: number,
//   password: string,
//   infix?: string
// ) {
//   let sqlQuery: string;
//   let values: any[];

//   sqlQuery = "INSERT INTO users (firstName, infix, lastName, email, permissionLevel, password) VALUES (?, ?, ?, ?, ?, ?);";
//   values = [firstName, infix, lastName, email, permissionLevel, password];

//   const result : any = await Database.query(sqlQuery, values);
//   return result;
// }

async function hasPermissions(id: string): Promise<boolean> {
  const data = await redisClient.hGetAll(id);
  const permissionLevel = parseInt(data.permissionLevel);
  if (permissionLevel == 2) {
    return true;
  } else {
    return false;
  }
}
