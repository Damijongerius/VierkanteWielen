"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementManager = void 0;
const Database_1 = require("./Database");
class AnnouncementManager {
    async addAnnouncement(title, content, footer) {
        const sqlQuery = `INSERT INTO announcements (title, content, footer) VALUES ("${title}", "${content}", "${footer}")`;
        await Database_1.Database.conn.query(sqlQuery);
    }
    async removeAnnouncement(id) {
        const sqlQuery = `DELETE FROM announcements WHERE id = ${id}`;
        await Database_1.Database.conn.query(sqlQuery);
    }
    async getAnnouncement(id) {
        const sqlQuery = `SELECT * FROM announcements WHERE id = ${id}`;
        const [rows] = await Database_1.Database.conn.query(sqlQuery);
        if (rows.length > 0) {
            const { id, title, content, footer } = rows[0];
            return { id, title, content, footer };
        }
        return null;
    }
    async modifyAnnouncement(id, title, content, footer) {
        const sqlQuery = `UPDATE announcements SET title = "${title}", content = "${content}", footer = "${footer}" WHERE id = ${id}`;
        await Database_1.Database.conn.query(sqlQuery);
    }
}
exports.AnnouncementManager = AnnouncementManager;
//# sourceMappingURL=AnnouncementManager.js.map