"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
//const dataBase : Database = new Database("localhost", "root", "", "vierkantewielen"); 
App_1.app.get("/", function (req, res) {
    res.render("index");
});
//# sourceMappingURL=Index.js.map