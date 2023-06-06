"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_js_1 = require("./DataBase/Database.js");
const UserManager_js_1 = require("./DataBase/UserManager.js");
const App_js_1 = require("./App.js");
const Logger_js_1 = require("./Logger.js");
Database_js_1.Database.connect("localhost", "dami", "dami", "vierkantewielen");
const userManager = new UserManager_js_1.UserManager();
const logger = new Logger_js_1.Logger("index");
const studentPermission = 1;
App_js_1.app.get("/", function (req, res) {
    res.render("index");
});
App_js_1.app.get("/login", function (req, res) {
    res.render("login");
});
App_js_1.app.get("/registreer", function (req, res) {
    res.render("registreer");
});
App_js_1.app.get("/resetWachtwoord", function (req, res) {
    res.render("resetWachtwoord");
});
App_js_1.app.get("/pakket", function (req, res) {
    res.render("pakket");
});
App_js_1.app.get("/rooster", function (req, res) {
    res.render("rooster");
});
App_js_1.app.post("/pakket_kopen", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
App_js_1.app.post("/register", function (req, res) {
    console.log(req.body);
    const user = req.body;
    userManager.addUser(user.voornaam, user.achternaam, user.email, studentPermission, user.wachtwoord, user.tussenvoegsel);
    res.render("rooster");
});
App_js_1.app.post("/login", function (req, res) {
    console.log(req.body);
});
App_js_1.app.post("/logout", function (req, res) {
    console.log(req.body);
});
//# sourceMappingURL=Index.js.map