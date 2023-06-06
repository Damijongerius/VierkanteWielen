"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("./DataBase/Database");
const UserManager_1 = require("./DataBase/UserManager");
const App_1 = require("./App");
const Logger_1 = require("./Logger");
const mysql_1 = __importDefault(require("mysql"));
const connection = mysql_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vierkantewielen",
});
Database_1.Database.connect("localhost", "root", "", "vierkantewielen");
const userManager = new UserManager_1.UserManager();
const logger = new Logger_1.Logger("index");
App_1.app.get("/", function (req, res) {
    res.render("index");
});
App_1.app.get("/login", function (req, res) {
    res.render("login");
});
App_1.app.get("/registreer", function (req, res) {
    res.render("registreer");
});
App_1.app.get("/resetWachtwoord", function (req, res) {
    res.render("resetWachtwoord");
});
App_1.app.get("/pakket", function (req, res) {
    res.render("pakket");
});
App_1.app.get("/rooster", function (req, res) {
    res.render("rooster");
});
App_1.app.post("/pakket_kopen", async (req, res) => {
    const { bevestigen12 } = req.body;
    const query = "INSERT INTO subscriptions (subscriptionLevel) VALUES (?)";
    connection.query(query, [bevestigen12], (error, results) => {
        if (error) {
            console.error("Error inserting data:", error);
            res.status(500).json({ error: "An error occurreddddd" });
        }
        else {
            res.json({ message: "Data inserted successfully" });
        }
    });
});
//# sourceMappingURL=Index.js.map