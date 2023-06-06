"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_js_1 = require("./DataBase/Database.js");
const UserManager_js_1 = require("./DataBase/UserManager.js");
const App_js_1 = require("./App.js");
const Logger_js_1 = require("./Logger.js");
Database_js_1.Database.connect("localhost", "dami", "dami", "vierkantewielen");
const userManager = new UserManager_js_1.UserManager();
const logger = new Logger_js_1.Logger("index");
App_js_1.app.get("/", function (req, res) {
    res.render("index");
});
App_js_1.app.post("/register", function (req, res) {
    console.log(req.body);
});
App_js_1.app.post("/login", function (req, res) {
    {
    }
});
App_js_1.app.post("/logout", function (req, res) {
});
//# sourceMappingURL=Index.js.map