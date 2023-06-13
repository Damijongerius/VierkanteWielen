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
const autos = new CarManager_1.CarManager();
class Dashboard {
    dashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            hasPermissions(req.session.id, res, 'dashboard');
        });
    }
    Autos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const currautos = yield autos.getCars();
            console.log(currautos);
            hasPermissions(req.session.id, res, 'dashboardAutos');
        });
    }
    AutosAdd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield hasPermissions(req.session.id, res, 'dashboardAutos');
        });
    }
    dashboardStudenten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            hasPermissions(req.session.id, res, 'dashboardStudenten');
        });
    }
    dashboardDocenten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            hasPermissions(req.session.id, res, 'dashboardDocenten');
        });
    }
    dashboardAankondigingen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            hasPermissions(req.session.id, res, 'dashboardAankondigingen');
        });
    }
}
exports.Dashboard = Dashboard;
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