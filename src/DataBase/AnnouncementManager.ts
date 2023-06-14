import { Database } from "./Database.js";

export class AnnouncementManager{

    async addAnnouncement(title: string, content: string, footer: string) {
        const sqlQuery = `INSERT INTO announcements (title, content, footer) VALUES ("${title}", "${content}", "${footer}")`;
        await Database.conn.query(sqlQuery);
      }
      
      async removeAnnouncement(id: number) {
        const sqlQuery = `DELETE FROM announcements WHERE id = ${id}`;
        await Database.conn.query(sqlQuery);
      }
      
      async getAnnouncement(id: number) {
        const sqlQuery = `SELECT * FROM announcements WHERE id = ${id}`;
        const [rows] = await Database.conn.query(sqlQuery);
        if (rows.length > 0) {
          const { id, title, content, footer } = rows[0];
          return { id, title, content, footer };
        }
        return null;
      }
      
      async modifyAnnouncement(id: number, title: string, content: string, footer: string) {
        const sqlQuery = `UPDATE announcements SET title = "${title}", content = "${content}", footer = "${footer}" WHERE id = ${id}`;
        await Database.conn.query(sqlQuery);
      }

      async addAnnouncementTo(){

      }

      async removeAnnouncementFrom(){
        
      }
}