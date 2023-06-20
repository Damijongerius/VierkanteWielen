import { Database } from "./DataBase/Database.js";
import { UserManager } from "./DataBase/UserManager.js";
import { app, redisClient } from "./App.js";
import session from "express-session";
import path from "path";
import { Logger } from "./Logger.js";
import {
  EncryptPasswordASync,
  comparePassword,
} from "./encryption/Encryptor.js";
import { Lesson } from "./manager/lesson.js";
import { Request, Response } from "express";

Database.connect("localhost", "dami", "dami", "vierkantewielen");

const userManager = new UserManager();
const logger = new Logger("index");
const lesson = new Lesson();

const studentPermission = 1;

app.get("/", async function (req, res) {
  res.render("index");
});

app.get("/login", async function (req, res) {
  const data = await redisClient.hGetAll(req.session.id);
  if (data.id == null) {
    res.render("login");
  } else {
    res.render("rooster");
  }
});

app.get("/registreer", async function (req, res) {
  const data = await redisClient.hGetAll(req.session.id);
  if (data.id != null) {
    res.render("rooster");
  } else {
    res.render("registreer");
  }
});

app.get("/resetWachtwoord", function (req, res) {
  res.render("resetWachtwoord");
});

app.get("/pakket", function (req, res) {
  res.render("pakket");
});

app.get("/rooster", async function (req, res: Response) {
  const data = await redisClient.hGetAll(req.session.id);
  if (data.id == null) {
    res.render("login");
  } else {
    let sqlQuery: string;

    sqlQuery =
      "SELECT id, firstName, lastName FROM users WHERE permissionLevel = 1";
    const result: any = await Database.query(sqlQuery);
    const allStudents = result;
    const data = await redisClient.hGetAll(req.session.id);

    sqlQuery =
    "SELECT l.*, u.firstName, u.lastName FROM Lessons l JOIN UserLessons ul ON l.lessonId = ul.Lesson_lessonId JOIN users u ON ul.user_id = u.id WHERE ul.user_id = " + data.id + ";"
    const result2: any = await Database.query(sqlQuery);

    const roosterPlanning = result2;
    if(data.permissionLevel == "1"){res.render("rooster", { roosterPlanning });} else if (data.permissionLevel == "2"){res.render("rooster-docent", { allStudents, roosterPlanning})}
    
  }
});

app.post("/pakket/kopen", async (req, res) => {
  const data = await redisClient.hGetAll(req.session.id);
  if (data.id == null) {
    res.render("login");
  }
  //   const { bevestigen12 } = req.body;
  //   const query = "INSERT INTO subscriptions (subscriptionLevel) VALUES (?)";
  //   connection.query(query, [bevestigen12], (error, results) => {
  //     if (error) {
  //       console.error("Error inserting data:", error);
  //       res.status(500).json({ error: "An error occurreddddd" });
  //     } else {
  //       res.json({ message: "Data inserted successfully" });
  //     }
  //   });
});

app.post("/register", async function (req, res) {
  const user = req.body;
  const hashPassword = await EncryptPasswordASync(user.wachtwoord);
  await userManager
    .addUser(
      user.voornaam,
      user.achternaam,
      user.email,
      studentPermission,
      hashPassword,
      user.tussenvoegsel
    )
    .then((result) => {
      res.redirect("rooster");
    });
});

app.post("/login", async function (req, res) {
  const email: string = req.body.email;
  const password: string = req.body.wachtwoord;
  if (email === undefined || password === undefined) {
    res.render("login", { email });
  }

  const users: any[] = await userManager.getUser(email);

  if (users.length == 0) {
    res.render("login", { email });
  }
  users.forEach(async (user) => {
    const correct = await comparePassword(password, user.password);
    console.log(correct);
    if (correct) {
      await redisClient.hSet(req.session.id, {
        email: user.email,
        id: user.id,
        permissionLevel: user.permissionLevel,
      });
      res.redirect("rooster");
    } else {
      res.render("login", { email });
    }
  });
});

app.get("/logout", function (req, res) {
  redisClient.hDel(req.session.id, "email");
  redisClient.hDel(req.session.id, "id");
  redisClient.hDel(req.session.id, "permissionLevel");
  res.redirect("login");
});

app.post("/lesson/add", lesson.Add);

app.post("/changeOptions", lesson.Update);

app.post("/cancelLesson", lesson.Cancel);

app.post("/results", lesson.Results);