import { Database } from "./DataBase/Database.js";
import { UserManager } from './DataBase/UserManager.js';
import { app } from "./App.js";
import  path from "path";
import { Logger } from "./Logger.js";

Database.connect("localhost", "dami", "dami", "vierkantewielen"); 

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

app.get("/rooster", function (req, res) {
  res.render("rooster");
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

app.post("/register", function(req,res){
    console.log(req.body)
})

app.post("/login", function(req,res){
    {

    }
})

app.post("/logout", function(req,res){

})