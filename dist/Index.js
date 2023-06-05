"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("./DataBase/Database");
const UserManager_1 = require("./DataBase/UserManager");
const App_1 = require("./App");
const Logger_1 = require("./Logger");
Database_1.Database.connect("localhost", "root", "", "vierkantewielen");
const userManager = new UserManager_1.UserManager();
const logger = new Logger_1.Logger("index");
logger.log("hoi");
App_1.app.get("/", function (req, res) {
    res.render("index");
});
//# sourceMappingURL=Index.js.map