"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const Database_1 = require("./Database");
class UserManager {
    //  //\\ //\\ //\\
    async addUser(firstName, lastName, email, permissionLevel, password, infix) {
        let sqlQuery;
        if (infix === undefined) {
            sqlQuery = `INSERT INTO users (firstName,lastName,email,permissionLevel,password) VALUES (${firstName},${lastName},${email},${permissionLevel},${password})`;
        }
        else {
            sqlQuery = `INSERT INTO users (firstName,infix,lastName,email,permissionLevel,password) VALUES (${firstName},${infix},${lastName},${email},${permissionLevel},${password})`;
        }
        return await Database_1.Database.query(sqlQuery);
    }
    //  \\// \\// \\//
    //  //\\ //\\ //\\
    async deleteUser(id) {
        const sqlQuery = `Delete FROM users WHERE id = ${id}`;
        return await Database_1.Database.conn.query(sqlQuery);
    }
    async modifyUser(id, arg1, arg2, arg3) {
        let sqlQuery;
        if (typeof arg1 === "number" && typeof arg2 === "number") {
            // modifyUser(id: number, permissionLevel: number) implementation
            sqlQuery = `UPDATE users SET permissionLevel = ${arg1} WHERE id = ${id} `;
        }
        else if (typeof arg1 === "number" && typeof arg2 === "string" && typeof arg3 === "string") {
            // modifyUser(id: number, firstName: string, infix: string, lastName: string) implementation
            sqlQuery = `UPDATE users SET firstname = "${arg1}", infix = "${arg2}", lastName = "${arg3}" WHERE id = ${id} `;
        }
        else if (typeof arg1 === "number" && typeof arg2 === "string") {
            // modifyUser(id: number, password: string) implementation
            sqlQuery = `UPDATE users SET password = "${arg1}" WHERE id = ${id} `;
        }
        else if (typeof arg1 === "number" && typeof arg2 === "string") {
            // modifyUser(id: number, email: string) implementation
            sqlQuery = `UPDATE users SET email = "${arg1}" WHERE id = ${id} `;
        }
        else if (typeof arg1 === "number" && typeof arg2 === "number") {
            // modifyUser(id: number, gender: number) implementation
            sqlQuery = `UPDATE users SET gender = ${arg1} WHERE id = ${id} `;
        }
        else if (typeof arg1 === "number" && typeof arg2 === "boolean") {
            // modifyUser(id: number, isSick: boolean) implementation
            sqlQuery = `UPDATE users SET isSick = ${arg1} WHERE id = ${id} `;
        }
        return await Database_1.Database.query(sqlQuery);
    }
    async getUser(arg1, arg2, arg3) {
        let sqlQuery;
        if (arg2 !== undefined && arg3 !== undefined) {
            sqlQuery = `SELECT * FROM users WHERE firstName = "${arg1}" AND infix = "${arg2}" AND lastName = "${arg3}"`;
        }
        else if (arg2 !== undefined) {
            sqlQuery = `SELECT * FROM users WHERE firstName = "${arg1}" AND lastName = "${arg2}"`;
        }
        if (arg1 instanceof Number) {
            sqlQuery = `SELECT * FROM users WHERE id = ${arg1}`;
        }
        else if (arg1 instanceof String) {
            sqlQuery = `SELECT * FROM users WHERE email = "${arg1}" `;
        }
        return await Database_1.Database.query(sqlQuery);
    }
    //  \\// \\// \\//
    async addLessonToUser(userId, lessonId) {
        const sqlQuery = `INSERT INTO userLessons (user_id,lesson_id) VALUES (${userId},${lessonId})`;
        return await Database_1.Database.query(sqlQuery);
    }
    async getUserLessonIds(id) {
        const sqlQuery = `Select * FROM userLessons WHERE user_id = ${id}`;
        return await Database_1.Database.query(sqlQuery);
    }
    async addSubscription(id, subscriptionLevel) {
        const currentDate = new Date();
        const sqlQuery = `INSERT INTO subscriptions (user_id,subscriptionLevel,startDate) VALUES (${id},${subscriptionLevel},${currentDate.toISOString()})`;
        return await Database_1.Database.query(sqlQuery);
    }
    async getSubscription(id) {
        const sqlQuery = `Select * FROM subscriptions WHERE user_id = ${id}`;
        return await Database_1.Database.query(sqlQuery);
    }
    async deleteSubsciption(id) {
        const sqlQuery = `Delete FROM subscriptions WHERE user_id = ${id}`;
        return await Database_1.Database.query(sqlQuery);
    }
    async modifySubscription(id, subType, lessonsUsed) {
        const sqlQuery = `UPDATE subscriptions SET subscriptionLevel = ${subType}, lessonsUsed = ${lessonsUsed} WHERE user_id = ${id}`;
        return await Database_1.Database.query(sqlQuery);
    }
}
exports.UserManager = UserManager;
//# sourceMappingURL=UserManager.js.map