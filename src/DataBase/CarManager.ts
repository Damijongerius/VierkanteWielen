import { Database } from "./Database.js";

export class CarManager{

    async addCar(licencePlate: string, manufacturer: string, color: string) {
        const sqlQuery = `INSERT INTO cars (licencePlate, manufacturers, color) VALUES ("${licencePlate}", "${manufacturer}", "${color}")`;
        await Database.conn.query(sqlQuery);
      }
      
      async getCar(licencePlate: string) {
        const sqlQuery = `SELECT * FROM cars WHERE licencePlate = "${licencePlate}"`;
        return await Database.conn.query(sqlQuery);
      }

      async getCars() {
        const sqlQuery = `SELECT * FROM cars`;
        return await Database.query(sqlQuery);
      }
      
      async removeCar(licencePlate: string) {
        const sqlQuery = `DELETE FROM cars WHERE licencePlate = "${licencePlate}"`;
        await Database.conn.query(sqlQuery);
      }
}