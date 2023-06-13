import { Database } from "./Database.js";

export class CarManager{

    async addCar(licencePlate: string, manufacturer: string, color: string) {
        const sqlQuery = `INSERT INTO cars (licencePlate, manufacturer, color) VALUES ("${licencePlate}", "${manufacturer}", "${color}")`;
        await Database.conn.query(sqlQuery);
      }
      
      async getCar(licencePlate: string) {
        const sqlQuery = `SELECT * FROM cars WHERE licencePlate = "${licencePlate}"`;
        const [rows] = await Database.conn.query(sqlQuery);
        if (rows.length > 0) {
          const { licencePlate, manufacturer, color } = rows[0];
          return { licencePlate, manufacturer, color };
        }
        return null;
      }

      async getCars() {
        const sqlQuery = `SELECT * FROM cars`;
        const rows = await Database.conn.query(sqlQuery);
        if (rows.length > 0) {
          return rows;
        }
      }
      
      async removeCar(licencePlate: string) {
        const sqlQuery = `DELETE FROM cars WHERE licencePlate = "${licencePlate}"`;
        await Database.conn.query(sqlQuery);
      }
}