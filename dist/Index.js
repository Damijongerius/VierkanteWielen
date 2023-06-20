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
const Subscription_js_1 = require("./manager/Subscription.js");
const Dashboard_js_1 = require("./manager/Dashboard.js");
const Logger_js_1 = require("./Logger.js");
const Encryptor_js_1 = require("./encryption/Encryptor.js");
const Profiel_js_1 = require("./manager/Profiel.js");
Database_js_1.Database.connect("localhost", "dami", "dami", "vierkantewielen");
const dashboard = new Dashboard_js_1.Dashboard();
const userManager = new UserManager_js_1.UserManager();
const subscriptionManager = new Subscription_js_1.SubscriptionManager();
const profiel = new Profiel_js_1.Profiel();
const logger = new Logger_js_1.Logger("index");
const studentPermission = 1;
//dashboard calls
// //\\//\\//\\
App_js_1.app.get("/dashboard", dashboard.dashboard);
App_js_1.app.get("/dashboard/autos", dashboard.Autos);
// //\\//\\//\\
App_js_1.app.post("/dashboard/autos/add", dashboard.AutosAdd);
App_js_1.app.post("/dashboard/autos/remove");
App_js_1.app.post("/dashboard/autos/modify");
// \\//\\//\\//
App_js_1.app.get("/dashboard/studenten", dashboard.dashboardStudenten);
// //\\//\\//\\
App_js_1.app.post("/dashboard/studenten/add");
App_js_1.app.post("/dashboard/studenten/remove");
App_js_1.app.post("/dashboard/studenten/modify");
// \\//\\//\\//
App_js_1.app.get("/dashboard/docenten", dashboard.dashboardDocenten);
// //\\//\\//\\
App_js_1.app.post("/dashboard/docenten/add");
App_js_1.app.post("/dashboard/docenten/remove");
App_js_1.app.post("/dashboard/docenten/modify");
// \\//\\//\\//
App_js_1.app.get("/dashboard/Aankondigingen", dashboard.dashboardAankondigingen);
// //\\//\\//\\
App_js_1.app.post("/dashboard/Aankondigingen/add");
App_js_1.app.post("/dashboard/Aankondigingen/remove");
App_js_1.app.post("/dashboard/Aankondigingen/modify");
// \\//\\//\\//
App_js_1.app.get("/profiel", profiel.render);
// \\//\\//\\//
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
            res.redirect("rooster");
        }
    });
});
App_js_1.app.get("/registreer", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield App_js_1.redisClient.hGetAll(req.session.id);
        if (data.id != null) {
            res.redirect("rooster");
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
            res.redirect("login");
        }
        else {
            res.render("rooster");
        }
    });
});
App_js_1.app.post("/pakket/kopen", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const data = yield App_js_1.redisClient.hGetAll(req.session.id);
    if (req.body.bevestigen !== "on") {
        res.redirect("pakket");
    }
    else if (data.id == null) {
        res.redirect("login");
    }
    else {
        const id = parseInt(data.id);
        const result = yield subscriptionManager.subscribe(id, req.body.pakket);
        if (result != false) {
            res.redirect("/");
        }
        else {
            res.redirect("pakket");
        }
    }
}));
App_js_1.app.post("/register", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        const hashPassword = yield (0, Encryptor_js_1.EncryptPasswordASync)(user.wachtwoord);
        yield userManager
            .addUser(user.voornaam, user.achternaam, user.email, studentPermission, hashPassword, user.tussenvoegsel)
            .then((result) => __awaiter(this, void 0, void 0, function* () {
            console.log(result);
            res.redirect("rooster");
        }));
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
//# sourceMappingURL=Index.js.map