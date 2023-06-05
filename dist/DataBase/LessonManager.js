"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonManager = void 0;
const Database_1 = require("./Database");
class LessonManager {
    async addLesson(lessonDescription, lessonGoal, ophaalLocatie) { }
    async deleteLesson(lessonId) {
        const sqlQuery = `DELETE FROM lessons WHERE lessonId = ${lessonId}`;
        await Database_1.Database.conn.query(sqlQuery);
    }
    async modifyLesson(lessonId, arg1, arg2) {
        let sqlQuery;
        if (typeof arg1 === "boolean") {
            if (typeof arg2 === "string") {
                sqlQuery = `UPDATE lessons SET isCanceled = ${arg1}, cancelReason = "${arg2}" WHERE lessonId = ${lessonId}`;
            }
            else {
                sqlQuery = `UPDATE lessons SET isExam = ${arg1} WHERE lessonId = ${lessonId}`;
            }
        }
        else if (typeof arg1 === "string") {
            if (typeof arg2 === "string") {
                sqlQuery = `UPDATE lessons SET lessonDescription = "${arg1}", lessonGoal = "${arg2}" WHERE lessonId = ${lessonId}`;
            }
            else {
                sqlQuery = `UPDATE lessons SET ophaalLocatie = "${arg1}" WHERE lessonId = ${lessonId}`;
            }
        }
        else if (arg1 instanceof Date) {
            const formattedDate = arg1.toISOString(); // Format the date as per your database requirements
            sqlQuery = `UPDATE lessons SET lessonDate = "${formattedDate}" WHERE lessonId = ${lessonId}`;
        }
        else {
            throw new Error("Invalid argument provided");
        }
        await Database_1.Database.conn.query(sqlQuery);
    }
    async getLessons(arg1, arg2) {
        let sqlQuery;
        switch (arg1) {
            case GetLessonsArgument.LessonId:
                sqlQuery = `SELECT * FROM lessons WHERE lessonId = ${arg2}`;
                break;
            case GetLessonsArgument.UserId:
                sqlQuery = `SELECT * FROM lessons WHERE userId = ${arg2}`;
                break;
            case GetLessonsArgument.Date:
                const formattedDate = arg2.toISOString(); // Format the date as per your database requirements
                sqlQuery = `SELECT * FROM lessons WHERE date = "${formattedDate}"`;
                break;
            case GetLessonsArgument.LicencePlate:
                sqlQuery = `SELECT * FROM lessons WHERE car_licencePlate = "${arg2}"`;
                break;
            default:
                throw new Error("Invalid argument provided");
        }
        return await Database_1.Database.conn.query(sqlQuery);
    }
    async setResult(lessonId, result, positive, negative) {
        const sqlQuery = `UPDATE lessons SET result = "${result}", positive = "${positive}", negative = "${negative}" WHERE lessonId = ${lessonId}`;
        await Database_1.Database.conn.query(sqlQuery);
    }
    async removeResult(lessonId) {
        const sqlQuery = `UPDATE lessons SET result = NULL, positive = NULL, negative = NULL WHERE lessonId = ${lessonId}`;
        await Database_1.Database.conn.query(sqlQuery);
    }
    async getResult(lessonId) {
        const sqlQuery = `SELECT result, positive, negative FROM lessons WHERE lessonId = ${lessonId}`;
        const [rows] = await Database_1.Database.conn.query(sqlQuery);
        if (rows.length > 0) {
            const { result, positive, negative } = rows[0];
            return { result, positive, negative };
        }
        return null;
    }
    async setNote(lessonId, note) {
        const sqlQuery = `UPDATE lessons SET note = "${note}" WHERE lessonId = ${lessonId}`;
        await Database_1.Database.conn.query(sqlQuery);
    }
    async removeNote(lessonId) {
        const sqlQuery = `UPDATE lessons SET note = NULL WHERE lessonId = ${lessonId}`;
        await Database_1.Database.conn.query(sqlQuery);
    }
    async modifyNote(lessonId, note) {
        const sqlQuery = `UPDATE lessons SET note = "${note}" WHERE lessonId = ${lessonId}`;
        await Database_1.Database.conn.query(sqlQuery);
    }
    async getNotes(lessonId) {
        const sqlQuery = `SELECT note FROM lessons WHERE lessonId = ${lessonId}`;
        const [rows] = await Database_1.Database.conn.query(sqlQuery);
        if (rows.length > 0) {
            const { note } = rows[0];
            return note;
        }
        return null;
    }
}
exports.LessonManager = LessonManager;
var GetLessonsArgument;
(function (GetLessonsArgument) {
    GetLessonsArgument["LessonId"] = "lessonId";
    GetLessonsArgument["UserId"] = "userId";
    GetLessonsArgument["Date"] = "date";
    GetLessonsArgument["LicencePlate"] = "licencePlate";
})(GetLessonsArgument || (GetLessonsArgument = {}));
//# sourceMappingURL=LessonManager.js.map