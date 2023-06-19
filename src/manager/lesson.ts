import session from "express-session";
import { redisClient } from "../App";
import { Request, Response } from "express";
import { Database } from "../DataBase/Database.js";

export class Lesson {
  async Add(req: Request, res: Response) {
    console.log("qs");
    if ((await hasPermissions(req.session.id)) == false) {
      res.render("/rooster");
    }

    console.log(" big pp");

    const lessonDate = req.body.date;
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

    const Lesson_lessonId = result.insertId;
    const user_id = req.body.student_id;

    sqlQuery =
      "INSERT INTO UserLessons (Lesson_lessonId, user_id) VALUES (?, ?)";
    values = [Lesson_lessonId, user_id];

    const result2: any = await Database.query(sqlQuery, values);

    console.log(result2);

    res.redirect("/rooster");
  }
}

async function hasPermissions(id: string): Promise<boolean> {
  const data = await redisClient.hGetAll(id);
  const permissionLevel = parseInt(data.permissionLevel);
  if (permissionLevel == 2) {
    return true;
  } else {
    return false;
  }
}
