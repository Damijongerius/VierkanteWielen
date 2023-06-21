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
exports.AnnouncementManager = void 0;
const Database_js_1 = require("./Database.js");
class AnnouncementManager {
    addAnnouncement(title, content, footer) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `INSERT INTO announcments (title, content, footer) VALUES ("${title}", "${content}", "${footer}")`;
            yield Database_js_1.Database.conn.query(sqlQuery);
        });
    }
    removeAnnouncement(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `DELETE FROM announcments WHERE id = ${id}`;
            yield Database_js_1.Database.query(sqlQuery);
        });
    }
    getAnnouncement(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `SELECT * FROM announcments WHERE id = ${id}`;
            return yield Database_js_1.Database.query(sqlQuery);
        });
    }
    getAnnouncements() {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `SELECT * FROM announcments`;
            return yield Database_js_1.Database.query(sqlQuery);
        });
    }
    modifyAnnouncement(id, title, content, footer) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `UPDATE announcments SET title = "${title}", content = "${content}", footer = "${footer}" WHERE id = ${id}`;
            yield Database_js_1.Database.conn.query(sqlQuery);
        });
    }
}
exports.AnnouncementManager = AnnouncementManager;
//# sourceMappingURL=AnnouncementManager.js.map