import session from "express-session";
import { redisClient } from "../App";
import { Request, Response } from "express";
import { Database } from "../DataBase/Database.js";

export class Lesson {
  async Add(req: Request, res: Response) {
    if ((await hasPermissions(req.session.id)) == false) {
      res.render("/rooster");
    }
    console.log(req.body.date);

    const lessonDate = req.body.date;
    // const student_name = req.body.student_name;
    const isExam = req.body.examen;
    const lessonDescription = req.body.description;
    const lessonGoal = req.body.goal;
    const ophaalLocatie = req.body.pickup;

    const car_licencePlate = "abc";

    let sqlQuery: string;
    let values: any[];

    sqlQuery =
      "INSERT INTO Lessons (lessonDate, lessonDescription, isExam, lessonGoal, ophaalLocatie, car_licencePlate) VALUES (?, ?, ?, ?, ?, ?);";
    values = [
      lessonDate,
      lessonDescription,
      isExam,
      lessonGoal,
      ophaalLocatie,
      car_licencePlate,
    ];

    const result: any = await Database.query(sqlQuery, values);
    console.log(result);
    return result;

    // [Object: null prototype] {
    //   date: '2023-06-29T06:00',
    //   student_name: 'asd',
    //   examen: '1',
    //   description: 'asd',
    //   goal: 'sad',
    //   pickup: 'location1'
    // }
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
