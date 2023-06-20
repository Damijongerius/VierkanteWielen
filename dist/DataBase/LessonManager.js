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
exports.LessonManager = void 0;
const Database_js_1 = require("./Database.js");
class LessonManager {
    addLesson(lessonDescription, lessonGoal, ophaalLocatie) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    deleteLesson(lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `DELETE FROM lessons WHERE lessonId = ${lessonId}`;
            yield Database_js_1.Database.conn.query(sqlQuery);
        });
    }
    modifyLesson(lessonId, arg1, arg2) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield Database_js_1.Database.query(sqlQuery);
        });
    }
    getExams(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("---------| getExams");
            console.log(userId);
            const sqlQuery = `SELECT * FROM UserLessons WHERE user_id = ${userId}`;
            const lessons = yield Database_js_1.Database.query(sqlQuery);
            console.log("---------| lessons");
            console.log(lessons);
            let ids = [];
            lessons.forEach((lesson) => {
                ids.push(lesson.Lesson_lessonId);
            });
            console.log(lessons);
            const sqlQuery2 = `SELECT * FROM lessons WHERE lessonId IN (${ids.join(',')}) and isExam = 1`;
            return yield Database_js_1.Database.query(sqlQuery2);
        });
    }
    getExamResults(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getExams(userId);
            let ids = [];
            result.forEach((lesson) => {
                if (lesson.isCanceled != 1) {
                    ids.push(lesson.lessonId);
                }
            });
            const sqlQuery2 = `SELECT * FROM results WHERE Lessons.lesson_Id in (${ids.join(',')})`;
            return yield Database_js_1.Database.query(sqlQuery2);
        });
    }
    getExamsResults(userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let lessonIds = [];
            console.log("--------------|userids");
            console.log(userIds);
            console.log("--------------|result");
            userIds.forEach((user) => __awaiter(this, void 0, void 0, function* () {
                const result = yield this.getExams(user);
                console.log(result);
                result.forEach((lesson) => {
                    console.log("--------------|lessson");
                    console.log(lesson);
                    if (lesson.isCanceled != 1) {
                        lessonIds.push(lesson.lessonId);
                    }
                });
            }));
            if (lessonIds.length == 0) {
                return [];
            }
            const sqlQuery2 = `SELECT * FROM results WHERE Lessons.lesson_Id in (${lessonIds.join(',')})`;
            return yield Database_js_1.Database.query(sqlQuery2);
        });
    }
    getLessons(arg1, arg2) {
        return __awaiter(this, void 0, void 0, function* () {
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
            return yield Database_js_1.Database.conn.query(sqlQuery);
        });
    }
    setResult(lessonId, result, positive, negative) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `UPDATE lessons SET result = "${result}", positive = "${positive}", negative = "${negative}" WHERE lessonId = ${lessonId}`;
            yield Database_js_1.Database.conn.query(sqlQuery);
        });
    }
    removeResult(lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `UPDATE lessons SET result = NULL, positive = NULL, negative = NULL WHERE lessonId = ${lessonId}`;
            yield Database_js_1.Database.conn.query(sqlQuery);
        });
    }
    getResult(lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `SELECT result, positive, negative FROM lessons WHERE lessonId = ${lessonId}`;
            const [rows] = yield Database_js_1.Database.conn.query(sqlQuery);
            if (rows.length > 0) {
                const { result, positive, negative } = rows[0];
                return { result, positive, negative };
            }
            return null;
        });
    }
    setNote(lessonId, note) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `UPDATE lessons SET note = "${note}" WHERE lessonId = ${lessonId}`;
            yield Database_js_1.Database.conn.query(sqlQuery);
        });
    }
    removeNote(lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `UPDATE lessons SET note = NULL WHERE lessonId = ${lessonId}`;
            yield Database_js_1.Database.conn.query(sqlQuery);
        });
    }
    modifyNote(lessonId, note) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `UPDATE lessons SET note = "${note}" WHERE lessonId = ${lessonId}`;
            yield Database_js_1.Database.conn.query(sqlQuery);
        });
    }
    getNotes(lessonId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `SELECT note FROM lessons WHERE lessonId = ${lessonId}`;
            const [rows] = yield Database_js_1.Database.conn.query(sqlQuery);
            if (rows.length > 0) {
                const { note } = rows[0];
                return note;
            }
            return null;
        });
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