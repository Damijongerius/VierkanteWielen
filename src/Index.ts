import { Database } from "./DataBase/Database";
import { UserManager } from "./DataBase/UserManager";
import { app } from "./App";
import path from "path";
import { Logger } from "./Logger";

Database.connect("localhost", "root", "", "vierkantewielen");

const userManager = new UserManager();
const logger = new Logger("index");

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
