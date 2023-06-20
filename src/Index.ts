import { Database } from "./DataBase/Database.js";
import { UserManager } from "./DataBase/UserManager.js";
import { app, redisClient } from "./App.js";
import { SubscriptionManager } from "./manager/Subscription.js";
import { Dashboard } from "./manager/Dashboard.js";
import session from "express-session";
import path from "path";
import { Logger } from "./Logger.js";
import {
  EncryptPasswordASync,
  comparePassword,
} from "./encryption/Encryptor.js";
import { Profiel } from "./manager/Profiel.js";

Database.connect("localhost", "dami", "dami", "vierkantewielen");

const dashboard: Dashboard = new Dashboard();

const userManager: UserManager = new UserManager();
const subscriptionManager: SubscriptionManager = new SubscriptionManager();
const profiel = new Profiel();
const logger: Logger = new Logger("index");

const studentPermission: number = 1;

//dashboard calls
// //\\//\\//\\
app.get("/dashboard", dashboard.dashboard);

app.get("/dashboard/autos", dashboard.Autos);
// //\\//\\//\\
app.post("/dashboard/autos/add", dashboard.AutosAdd);
app.post("/dashboard/autos/remove");
app.post("/dashboard/autos/modify");
// \\//\\//\\//

app.get("/dashboard/studenten", dashboard.dashboardStudenten);
// //\\//\\//\\
app.post("/dashboard/studenten/add");
app.post("/dashboard/studenten/remove");
app.post("/dashboard/studenten/modify");
// \\//\\//\\//

app.get("/dashboard/docenten", dashboard.dashboardDocenten);
// //\\//\\//\\
app.post("/dashboard/docenten/add");
app.post("/dashboard/docenten/remove");
app.post("/dashboard/docenten/modify");
// \\//\\//\\//

app.get("/dashboard/Aankondigingen", dashboard.dashboardAankondigingen);
// //\\//\\//\\
app.post("/dashboard/Aankondigingen/add");
app.post("/dashboard/Aankondigingen/remove");
app.post("/dashboard/Aankondigingen/modify");
// \\//\\//\\//
app.get("/profiel", profiel.render);
// \\//\\//\\//

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

app.get("/rooster", async function (req, res) {
  const data = await redisClient.hGetAll(req.session.id);
  if (data.id == null) {
    res.redirect("login");
  } else {
    res.render("rooster");
  }
});

app.post("/pakket/kopen", async (req, res) => {
  console.log(req.body);
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
      user.tussenvoegsel
    )
    .then(async (result) => {
      console.log(result);
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
