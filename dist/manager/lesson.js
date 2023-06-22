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
exports.Lesson = void 0;
const App_1 = require("../App");
const Database_js_1 = require("../DataBase/Database.js");
const LessonManager_1 = require("../DataBase/LessonManager");
const lessonManager = new LessonManager_1.LessonManager();
class Lesson {
    Add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield hasPermissions(req.session.id)) == false) {
                res.redirect("/rooster");
            }
            const lessonDate = req.body.date;
            const isExam = req.body.examen;
            const lessonDescription = req.body.description;
            const lessonGoal = req.body.goal;
            const ophaalLocatie = req.body.pickup;
            const car_licencePlate = "abc";
            let sqlQuery;
            let values;
            sqlQuery =
                "INSERT INTO Lessons (lessonDate, lessonDescription, isExam, lessonGoal, ophaalLocatie, car_licencePlate) VALUES (?, ?, ?, ?, ?, ?);";
            values = [
                lessonDate,
                lessonDescription,
                isExam,
                lessonGoal,
                ophaalLocatie,
                car_licencePlate,
            ];
            const result = yield Database_js_1.Database.query(sqlQuery, values);
            const Lesson_lessonId = result.insertId;
            const user_id = req.body.student_id;
            sqlQuery =
                "INSERT INTO UserLessons (Lesson_lessonId, user_id) VALUES (?, ?)";
            values = [Lesson_lessonId, user_id];
            yield Database_js_1.Database.query(sqlQuery, values);
            const data = yield App_1.redisClient.hGetAll(req.session.id);
            values = [Lesson_lessonId, data.id];
            yield Database_js_1.Database.query(sqlQuery, values);
            res.redirect("/rooster");
        });
    }
    Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlQuery;
            let values;
            const lessonId = req.body.lessonId;
            const lessonGoal = req.body.lessonGoal;
            const isExam = req.body.isExam;
            const ophaalLocatie = req.body.ophaalLocatie;
            const lessonDescription = req.body.lessonDescription;
            values = [
                lessonGoal,
                isExam,
                ophaalLocatie,
                lessonDescription,
                lessonId
            ];
            sqlQuery =
                "UPDATE Lessons SET lessonGoal = ?, isExam = ?, ophaalLocatie = ?, lessonDescription = ? WHERE lessonId = ?;";
            const asd = yield Database_js_1.Database.query(sqlQuery, values);
            console.log(asd);
            res.redirect("/rooster");
        });
    }
    Cancel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlQuery;
            let values;
            const lessonId = req.body.lessonId;
            const cancelReason = req.body.cancelReason;
            const isSick = req.body.isSick;
            values = [
                cancelReason,
                lessonId
            ];
            sqlQuery =
                "UPDATE Lessons SET cancelReason = ?, isCanceled = 1 WHERE lessonId = ?;";
            const asd = yield Database_js_1.Database.query(sqlQuery, values);
            console.log(asd);
            res.redirect("/rooster");
        });
    }
    Results(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let sqlQuery;
            let values;
            console.log(req.body);
            const Result = req.body.Result;
            const Positive = req.body.Positive;
            const Negative = req.body.Negative;
            const lessonId = req.body.lessonId;
            const geslaagd = req.body.Geslaagd == "yes" ? true : false;
            values = [
                Result,
                Positive,
                Negative,
                lessonId,
                geslaagd,
            ];
            sqlQuery =
                "INSERT INTO results (result, positive, negative, Lessons_lessonId, geslaagd) VALUES (?, ?, ?, ?,?)";
            const asd = yield Database_js_1.Database.query(sqlQuery, values);
            console.log(asd);
            res.redirect("/rooster");
        });
    }
    stuurFeedback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = req.body;
            lessonManager.addNote(note.note, note.lessonId);
            res.redirect("/rooster");
        });
    }
}
exports.Lesson = Lesson;
function hasPermissions(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield App_1.redisClient.hGetAll(id);
        const permissionLevel = parseInt(data.permissionLevel);
        if (permissionLevel == 2) {
            return true;
        }
        else {
            return false;
        }
    });
}
//# sourceMappingURL=lesson.js.map