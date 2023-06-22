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
exports.UserManager = void 0;
const Database_js_1 = require("./Database.js");
class UserManager {
    //  //\\ //\\ //\\
    addUser(firstName, lastName, email, permissionLevel, password, infix) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlQuery;
            let values;
            sqlQuery =
                `INSERT INTO users (firstName, infix, lastName, email, permissionLevel, password) VALUES (?, ?, ?, ?, ?, ?) WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = '${email}');`;
            values = [firstName, infix, lastName, email, permissionLevel, password];
            const result = yield Database_js_1.Database.query(sqlQuery, values);
            return result;
        });
    }
    //  \\// \\// \\//
    //  //\\ //\\ //\\
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `Delete FROM users WHERE id = ${id}`;
            return yield Database_js_1.Database.conn.query(sqlQuery);
        });
    }
    modifyUser(id, arg1, arg2, arg3) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlQuery = `UPDATE users SET permissionLevel = ${arg1} WHERE id = ${id} `;
            return yield Database_js_1.Database.query(sqlQuery);
        });
    }
    getUser(arg1, arg2, arg3) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlQuery;
            let values;
            if (arg2 !== undefined && arg3 !== undefined) {
                sqlQuery = `SELECT * FROM users WHERE firstName = ? AND infix = ? AND lastName = ?`;
                values = [arg1, arg2, arg3];
            }
            else if (arg2 !== undefined) {
                sqlQuery = `SELECT * FROM users WHERE firstName = ? AND lastName = ?`;
                values = [arg1, arg2];
            }
            else if (typeof arg1 === "number") {
                sqlQuery = `SELECT * FROM users WHERE id = ?`;
                values = [arg1];
            }
            else if (typeof arg1 === "string") {
                sqlQuery = `SELECT * FROM users WHERE email = ?`;
                values = [arg1];
            }
            return yield Database_js_1.Database.query(sqlQuery, values);
        });
    }
    getUsers(permissionLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `SELECT * FROM users WHERE permissionLevel = ${permissionLevel}`;
            return yield Database_js_1.Database.query(sqlQuery);
        });
    }
    //  \\// \\// \\//
    addLessonToUser(userId, lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `INSERT INTO userLessons (user_id,lesson_id) VALUES (${userId},${lessonId})`;
            return yield Database_js_1.Database.query(sqlQuery);
        });
    }
    getUserLessonIds(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `Select * FROM userLessons WHERE user_id = ${id}`;
            return yield Database_js_1.Database.query(sqlQuery);
        });
    }
    addSubscription(id, subscriptionLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date();
            const sqlQuery = `INSERT INTO subscriptions (user_id,subscriptionLevel,startDate, lessonsUsed) VALUES (${id},${subscriptionLevel},'${convertToSqlDate(currentDate)}', 0)`;
            return yield Database_js_1.Database.query(sqlQuery);
        });
    }
    getSubscription(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `Select * FROM subscriptions WHERE user_id = ${id}`;
            return yield Database_js_1.Database.query(sqlQuery);
        });
    }
    getSubscriptions() {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `Select * FROM subscriptions`;
            return yield Database_js_1.Database.query(sqlQuery);
        });
    }
    deleteSubsciption(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `Delete FROM subscriptions WHERE user_id = ${id}`;
            return yield Database_js_1.Database.query(sqlQuery);
        });
    }
    modifySubscription(id, subType, lessonsUsed) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `UPDATE subscriptions SET subscriptionLevel = ${subType}, lessonsUsed = ${lessonsUsed} WHERE user_id = ${id}`;
            return yield Database_js_1.Database.query(sqlQuery);
        });
    }
}
exports.UserManager = UserManager;
function convertToSqlDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
//# sourceMappingURL=UserManager.js.map