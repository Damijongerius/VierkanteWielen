import { Database } from "./DataBase/Database.js";
import { UserManager } from "./DataBase/UserManager.js";
import { app } from "./App.js";
import path from "path";
import { Logger } from "./Logger.js";
import { EncryptPasswordASync } from "./encryption/Encryptor.js";

Database.connect("localhost", "dami", "dami", "vierkantewielen");

const userManager = new UserManager();
const logger = new Logger("index");

const studentPermission = 1;

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/registreer", function (req, res) {
  res.render("registreer");
});

app.get("/resetWachtwoord", function (req, res) {
  res.render("resetWachtwoord");
});

app.get("/pakket", function (req, res) {
  res.render("pakket");
});

app.get("/rooster", function (req, res) {
  res.render("rooster");
});

app.post("/pakket_kopen", async (req, res) => {
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
  console.log(req.body);
  const user = req.body;
  userManager.addUser(
    user.voornaam,
    user.achternaam,
    user.email,
    studentPermission,
    user.wachtwoord,
    await EncryptPasswordASync(user.tussenvoegsel)
  );

  res.render("rooster");
});

app.post("/login", function (req, res) {
  console.log(req.body);
});

app.post("/logout", function (req, res) {
  console.log(req.body);
});
