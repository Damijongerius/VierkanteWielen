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
const Encryptor_js_1 = require("./encryption/Encryptor.js");
const lesson_js_1 = require("./manager/lesson.js");
Database_js_1.Database.connect("localhost", "dami", "dami", "vierkantewielen");
const userManager = new UserManager_js_1.UserManager();
const logger = new Logger_js_1.Logger("index");
const lesson = new lesson_js_1.Lesson();
const studentPermission = 1;
App_js_1.app.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render("index");
    });
});
App_js_1.app.get("/login", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield App_js_1.redisClient.hGetAll(req.session.id);
        if (data.id == null) {
            res.render("login");
        }
        else {
            res.render("rooster");
        }
    });
});
App_js_1.app.get("/registreer", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield App_js_1.redisClient.hGetAll(req.session.id);
        if (data.id != null) {
            res.render("rooster");
        }
        else {
            res.render("registreer");
        }
    });
});
App_js_1.app.get("/resetWachtwoord", function (req, res) {
    res.render("resetWachtwoord");
});
App_js_1.app.get("/pakket", function (req, res) {
    res.render("pakket");
});
App_js_1.app.get("/rooster", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield App_js_1.redisClient.hGetAll(req.session.id);
        if (data.id == null) {
            res.render("login");
        }
        else {
            let sqlQuery;
            sqlQuery =
                "SELECT id, firstName, lastName FROM users WHERE permissionLevel = 1";
            const result = yield Database_js_1.Database.query(sqlQuery);
            const allStudents = result;
            const data = yield App_js_1.redisClient.hGetAll(req.session.id);
            sqlQuery =
                "SELECT l.*, u.firstName, u.lastName FROM Lessons l JOIN UserLessons ul ON l.lessonId = ul.Lesson_lessonId JOIN users u ON ul.user_id = u.id WHERE ul.user_id = " + data.id + ";";
            const result2 = yield Database_js_1.Database.query(sqlQuery);
            const roosterPlanning = result2;
            if (data.permissionLevel == "1") {
                res.render("rooster", { roosterPlanning });
            }
            else if (data.permissionLevel == "2") {
                res.render("rooster-docent", { allStudents, roosterPlanning });
            }
        }
    });
});
App_js_1.app.post("/pakket/kopen", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield App_js_1.redisClient.hGetAll(req.session.id);
    if (data.id == null) {
        res.render("login");
    }
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
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        const hashPassword = yield (0, Encryptor_js_1.EncryptPasswordASync)(user.wachtwoord);
        yield userManager
            .addUser(user.voornaam, user.achternaam, user.email, studentPermission, hashPassword, user.tussenvoegsel)
            .then((result) => {
            res.redirect("rooster");
        });
    });
});
App_js_1.app.post("/login", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.body.email;
        const password = req.body.wachtwoord;
        if (email === undefined || password === undefined) {
            res.render("login", { email });
        }
        const users = yield userManager.getUser(email);
        if (users.length == 0) {
            res.render("login", { email });
        }
        users.forEach((user) => __awaiter(this, void 0, void 0, function* () {
            const correct = yield (0, Encryptor_js_1.comparePassword)(password, user.password);
            console.log(correct);
            if (correct) {
                yield App_js_1.redisClient.hSet(req.session.id, {
                    email: user.email,
                    id: user.id,
                    permissionLevel: user.permissionLevel,
                });
                res.redirect("rooster");
            }
            else {
                res.render("login", { email });
            }
        }));
    });
});
App_js_1.app.get("/logout", function (req, res) {
    App_js_1.redisClient.hDel(req.session.id, "email");
    App_js_1.redisClient.hDel(req.session.id, "id");
    App_js_1.redisClient.hDel(req.session.id, "permissionLevel");
    res.redirect("login");
});
App_js_1.app.post("/lesson/add", lesson.Add);
App_js_1.app.post("/changeOptions", lesson.Update);
App_js_1.app.post("/cancelLesson", lesson.Cancel);
App_js_1.app.post("/results", lesson.Results);
//# sourceMappingURL=Index.js.map