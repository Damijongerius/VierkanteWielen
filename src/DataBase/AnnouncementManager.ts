import { Database } from "./Database.js";

export class AnnouncementManager{

    async addAnnouncement(title: string, content: string, footer: string) {
        const sqlQuery = `INSERT INTO announcments (title, content, footer) VALUES ("${title}", "${content}", "${footer}")`;
        await Database.conn.query(sqlQuery);
      }
      
      async removeAnnouncement(id: number) {
        const sqlQuery = `DELETE FROM announcments WHERE id = ${id}`;
        await Database.query(sqlQuery);
      }
      
      async getAnnouncement(id: number) {
        const sqlQuery = `SELECT * FROM announcments WHERE id = ${id}`;
        const [rows] = await Database.conn.query(sqlQuery);
        if (rows.length > 0) {
          const { id, title, content, footer } = rows[0];
          return { id, title, content, footer };
        }
        return null;
      }

      async getAnnouncements(){
        const sqlQuery = `SELECT * FROM announcments`
        return await Database.query(sqlQuery);
      }
      
      async modifyAnnouncement(id: number, title: string, content: string, footer: string) {
        const sqlQuery = `UPDATE announcments SET title = "${title}", content = "${content}", footer = "${footer}" WHERE id = ${id}`;
        await Database.conn.query(sqlQuery);
      }

      async addAnnouncementTo(){

      }

      async removeAnnouncementFrom(){
        
      }
}