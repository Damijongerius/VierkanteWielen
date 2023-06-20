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
            const sqlQuery = `INSERT INTO announcements (title, content, footer) VALUES ("${title}", "${content}", "${footer}")`;
            yield Database_js_1.Database.conn.query(sqlQuery);
        });
    }
    removeAnnouncement(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `DELETE FROM announcements WHERE id = ${id}`;
            yield Database_js_1.Database.query(sqlQuery);
        });
    }
    getAnnouncement(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `SELECT * FROM announcements WHERE id = ${id}`;
            const [rows] = yield Database_js_1.Database.conn.query(sqlQuery);
            if (rows.length > 0) {
                const { id, title, content, footer } = rows[0];
                return { id, title, content, footer };
            }
            return null;
        });
    }
    getAnnouncements() {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `SELECT * FROM announcements`;
            yield Database_js_1.Database.query(sqlQuery);
        });
    }
    modifyAnnouncement(id, title, content, footer) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `UPDATE announcements SET title = "${title}", content = "${content}", footer = "${footer}" WHERE id = ${id}`;
            yield Database_js_1.Database.conn.query(sqlQuery);
        });
    }
    addAnnouncementTo() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    removeAnnouncementFrom() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.AnnouncementManager = AnnouncementManager;
//# sourceMappingURL=AnnouncementManager.js.map