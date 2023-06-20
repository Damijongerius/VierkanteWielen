import session from "express-session";
import { redisClient } from "../App";
import { Request, Response } from "express";
import { Database } from "../DataBase/Database.js";

export class Lesson {
  async Add(req: Request, res: Response) {
    if ((await hasPermissions(req.session.id)) == false) {
      res.redirect("/rooster");
    }

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

    const Lesson_lessonId = result.insertId;
    const user_id = req.body.student_id;

    sqlQuery =
      "INSERT INTO UserLessons (Lesson_lessonId, user_id) VALUES (?, ?)";
    values = [Lesson_lessonId, user_id];

    await Database.query(sqlQuery, values);

    const data = await redisClient.hGetAll(req.session.id);
    values = [Lesson_lessonId, data.id];

    await Database.query(sqlQuery, values);

    res.redirect("/rooster");
  }

  async Update(req: Request, res: Response) {

    let sqlQuery: string;
    let values: any[];    

    const lessonId = req.body.lessonId;
    const lessonGoal = req.body.lessonGoal;
    const isExam = req.body.isExam;
    const ophaalLocatie = req.body.ophaalLocatie;
    const lessonDescription = req.body.lessonDescription;

    values = [
      lessonGoal,
      isExam,
      ophaalLocatie,
      lessonDescription,
      lessonId
    ];

    sqlQuery = 
    "UPDATE Lessons SET lessonGoal = ?, isExam = ?, ophaalLocatie = ?, lessonDescription = ? WHERE lessonId = ?;"

    const asd = await Database.query(sqlQuery, values);
    console.log(asd)
    res.redirect("/rooster")
  }

  async Cancel(req: Request, res: Response) {
    let sqlQuery: string;
    let values: any[];  

    const lessonId = req.body.lessonId;
    const cancelReason = req.body.cancelReason;
    const isSick = req.body.isSick;

    values = [
      cancelReason,
      lessonId
    ]

    sqlQuery = 
    "UPDATE Lessons SET cancelReason = ?, isCanceled = 1 WHERE lessonId = ?;";

    const asd = await Database.query(sqlQuery, values);
    console.log(asd)
    res.redirect("/rooster")
  }

  async Results(req: Request, res: Response) {
    let sqlQuery: string;
    let values: any[];  

    console.log(req.body)

    const Result = req.body.Result;
    const Positive = req.body.Positive;
    const Negative = req.body.Negative;
    const lessonId = req.body.lessonId;

    values = [
      Result,
      Positive,
      Negative,
      lessonId
    ]

    sqlQuery =
    "INSERT INTO results (result, positive, negative, Lessons_lessonId) VALUES (?, ?, ?, ?)";

    const asd = await Database.query(sqlQuery, values);
    console.log(asd)
    res.redirect("/rooster")
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
