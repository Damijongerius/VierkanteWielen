import { Database } from "./DataBase/Database";
import { UserManager } from "./DataBase/UserManager";
import { app } from "./App";
import path from "path";
import { Logger } from "./Logger";
import { Request, Response } from "express";
import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vierkantewielen",
});

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

app.post("/pakket_kopen", async (req, res) => {
  const { bevestigen12 } = req.body;

  const query = "INSERT INTO subscriptions (subscriptionLevel) VALUES (?)";
  connection.query(query, [bevestigen12], (error, results) => {
    if (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "An error occurreddddd" });
    } else {
      res.json({ message: "Data inserted successfully" });
    }
  });
});
