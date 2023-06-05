"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("./DataBase/Database");
const UserManager_1 = require("./DataBase/UserManager");
const App_1 = require("./App");
const Logger_1 = require("./Logger");
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
//# sourceMappingURL=Index.js.map