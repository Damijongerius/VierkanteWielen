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
exports.Dashboard = void 0;
const App_1 = require("../App");
const CarManager_1 = require("../DataBase/CarManager");
const UserManager_1 = require("../DataBase/UserManager");
const AnnouncementManager_1 = require("../DataBase/AnnouncementManager");
const autos = new CarManager_1.CarManager();
const user = new UserManager_1.UserManager();
const announcment = new AnnouncementManager_1.AnnouncementManager();
class Dashboard {
    dashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            hasPermissions(req.session.id, res, 'dashboard');
        });
    }
    autos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (hasPermission(req.session.id)) {
                const currAutos = yield autos.getCars();
                res.render('dashboardautos', currAutos);
            }
        });
    }
    autosAdd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield hasPermission(req.session.id)) {
                const autoInfo = req.body;
                autos.addCar(autoInfo.kenteken, autoInfo.fabrikant, autoInfo.kleur);
                res.redirect('dashboard/autos');
            }
        });
    }
    autosRemove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield hasPermission(req.session.id)) {
                const autoInfo = req.body;
                autos.removeCar(autoInfo.kenteken);
                res.redirect('dashboard/autos');
            }
        });
    }
    studenten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (hasPermission(req.session.id)) {
                const currStudenten = yield user.getUsers(1);
                res.render('DashboardStudenten', currStudenten);
            }
        });
    }
    studentenRemove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield hasPermission(req.session.id)) {
                const UserInfo = req.body;
                user.deleteUser(UserInfo.id);
                res.redirect('dashboard/studenten');
            }
        });
    }
    studentenToDocent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield hasPermission(req.session.id)) {
                const UserInfo = req.body;
                res.redirect('dashboard/studenten');
            }
        });
    }
    docenten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (hasPermission(req.session.id)) {
                const currDocenten = yield user.getUsers(2);
                res.render('DashboardDocenten', currDocenten);
            }
        });
    }
    docentenRemove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield hasPermission(req.session.id)) {
                const UserInfo = req.body;
                user.deleteUser(UserInfo.id);
                res.redirect('dashboard/docenten');
            }
        });
    }
    aankondigingen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (hasPermission(req.session.id)) {
                const currStudenten = yield user.getUsers(1);
                res.render('DashboardAankondigingen', currStudenten);
            }
        });
    }
    aankondegingenRemove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield hasPermission(req.session.id)) {
                const aankondiging = req.body;
                announcment.removeAnnouncement(aankondiging.id);
                res.redirect('dashboard/aankondigingen');
            }
        });
    }
    aankondegingenAdd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield hasPermission(req.session.id)) {
                const aankondiging = req.body;
                announcment.addAnnouncement(aankondiging.title, aankondiging.content, aankondiging.footer);
                res.redirect('dashboard/aankondigingen');
            }
        });
    }
}
exports.Dashboard = Dashboard;
function hasPermission(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield App_1.redisClient.hGetAll(id);
        const permissionLevel = parseInt(data.permissionLevel);
        if (permissionLevel == 3) {
            return true;
        }
        return false;
    });
}
function hasPermissions(id, res, render, extra) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield App_1.redisClient.hGetAll(id);
        console.log(data);
        const permissionLevel = parseInt(data.permissionLevel);
        console.log(permissionLevel);
        if (permissionLevel == 3) {
            if (extra) {
                res.render(render, extra);
            }
            else {
                res.render(render);
            }
        }
        else {
            res.redirect('/');
        }
    });
}
//# sourceMappingURL=Dashboard.js.map