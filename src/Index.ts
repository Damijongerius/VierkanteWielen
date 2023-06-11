import { Database } from "./DataBase/Database.js";
import { UserManager } from "./DataBase/UserManager.js";
import { app, redisClient } from "./App.js";
import { SubscriptionManager } from "./manager/Subscription.js";
import { DashboardManager } from "./manager/Dashboard.js"
import session from "express-session";
import path from "path";
import { Logger } from "./Logger.js";
import {
  EncryptPasswordASync,
  comparePassword,
} from "./encryption/Encryptor.js";

Database.connect("localhost", "dami", "dami", "vierkantewielen");

const dashboard : DashboardManager = new DashboardManager();

const userManager: UserManager = new UserManager();
const subscriptionManager: SubscriptionManager = new SubscriptionManager();
const logger: Logger = new Logger("index");

const studentPermission: number = 1;

//dashboard calls
// //\\//\\//\\
app.get('/dashboard', dashboard.dashboard);

app.get('/dashboard/autos', dashboard.dashboardAutos);
// //\\//\\//\\
app.get('/dashboard/autos/add');
app.get('/dashboard/autos/remove');
app.get('/dashboard/autos/modify');
// \\//\\//\\//

app.get('/dashboard/studenten', dashboard.dashboardStudenten);
// //\\//\\//\\
app.get('/dashboard/studenten/add');
app.get('/dashboard/studenten/remove');
app.get('/dashboard/studenten/modify');
// \\//\\//\\//

app.get('/dashboard/docenten', dashboard.dashboardDocenten);
// //\\//\\//\\
app.get('/dashboard/docenten/add');
app.get('/dashboard/docenten/remove');
app.get('/dashboard/docenten/modify');
// \\//\\//\\//

app.get('/dashboard/Aankondigingen', dashboard.dashboardAankondigingen);
// //\\//\\//\\
app.get('/dashboard/Aankondigingen/add');
app.get('/dashboard/Aankondigingen/remove');
app.get('/dashboard/Aankondigingen/modify');
// \\//\\//\\//

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
