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
exports.Profiel = void 0;
const App_1 = require("../App");
const LessonManager_1 = require("../DataBase/LessonManager");
const UserManager_1 = require("../DataBase/UserManager");
const user = new UserManager_1.UserManager();
const lesson = new LessonManager_1.LessonManager();
class Profiel {
    render(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (hasPermissions(req.session.id)) {
                const data = yield App_1.redisClient.hGetAll(req.session.id);
                const id = parseInt(data.id);
                const thisUser = yield user.getUser(id);
                const results = yield lesson.getResultWithUser(id);
                console.log(results);
                res.render("profiel", { thisUser, results });
            }
        });
    }
}
exports.Profiel = Profiel;
function hasPermissions(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield App_1.redisClient.hGetAll(id);
        const permissionLevel = parseInt(data.permissionLevel);
        if (permissionLevel != null) {
            return true;
        }
        else {
            return false;
        }
    });
}
//# sourceMappingURL=Profiel.js.map