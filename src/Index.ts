import { Database } from "./DataBase/Database.js";
import { UserManager } from "./DataBase/UserManager.js";
import { app, redisClient } from "./App.js";
import { SubscriptionManager } from "./manager/Subscription.js";
import { Dashboard } from "./manager/Dashboard.js";
import session from "express-session";
import path from "path";
import {
  EncryptPasswordASync,
  comparePassword,
} from "./encryption/Encryptor.js";
import { Profiel } from "./manager/Profiel.js";
import { Lesson } from "./manager/lesson.js";
import { Request, Response } from "express";
import { AnnouncementManager } from "./DataBase/AnnouncementManager.js";

Database.connect("localhost", "dami", "dami", "vierkantewielen");

const dashboard : Dashboard = new Dashboard();
const lesson = new Lesson();
const announcement : AnnouncementManager = new AnnouncementManager();

const userManager: UserManager = new UserManager();
const subscriptionManager: SubscriptionManager = new SubscriptionManager();

const profiel : Profiel = new Profiel();

const studentPermission: number = 1;

//dashboard calls
// //\\//\\//\\
app.get("/dashboard", dashboard.dashboard);

app.get('/dashboard/autos', dashboard.autos);
// //\\//\\//\\
app.post('/dashboard/autos/add', dashboard.autosAdd);
app.post('/dashboard/autos/remove', dashboard.autosRemove);
// \\//\\//\\//

app.get('/dashboard/studenten', dashboard.studenten);
// //\\//\\//\\
app.post('/dashboard/studenten/remove', dashboard.studentenRemove);
app.post('/dashboard/studenten/modify', dashboard.studentenModify);
// \\//\\//\\//

app.get('/dashboard/docenten', dashboard.docenten);
// //\\//\\//\\
app.post('/dashboard/docenten/remove', dashboard.docentenRemove);
// \\//\\//\\//

app.get('/dashboard/aankondegingen', dashboard.aankondigingen);
// //\\//\\//\\
app.post('/dashboard/aankondegingen/add', dashboard.aankondegingenAdd);
app.post('/dashboard/aankondegingen/remove', dashboard.aankondegingenRemove);
app.post('/dashboard/aankondegingen/modify', dashboard.aankondegingenModify);
// \\//\\//\\//
app.get("/profiel", profiel.render);
// \\//\\//\\//

app.get("/announcements", async function (req,res) {
  const announcements = await announcement.getAnnouncements()
  res.render('announcement', { announcements });
})

app.get("/", async function (req, res) {
  res.render("index");
});

app.get("/login", async function (req, res) {
  const data = await redisClient.hGetAll(req.session.id);
  if (data.id == null) {
    res.render("login");
  } else {
    res.redirect("rooster");
  }
});

app.get("/registreer", async function (req, res) {
  const data = await redisClient.hGetAll(req.session.id);
  if (data.id != null) {
    res.redirect("rooster");
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
    res.redirect("login");
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
    if(data.permissionLevel == "1"){res.render("rooster", { roosterPlanning });} else if (data.permissionLevel == "2"){res.render("rooster-docent", { allStudents, roosterPlanning}) } else if (data.permissionLevel == "3"){res.redirect("/dashboard")}
    
  }
});

app.post("/pakket/kopen", async (req, res) => {
  const data = await redisClient.hGetAll(req.session.id);
  if (req.body.bevestigen !== "on") {
    res.redirect("pakket");
  } else if (data.id == null) {
    res.redirect("login");
  } else {
    const id: number = parseInt(data.id);
    const result = await subscriptionManager.subscribe(id, req.body.pakket);
    if (result != false) {
      res.redirect("/");
    } else {
      res.redirect("pakket");
    }
  }
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
      user.tussenvoegesel
    )
    .then(async (result) => {
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