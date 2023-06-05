"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarManager = void 0;
const Database_1 = require("./Database");
class CarManager {
    async addCar(licencePlate, manufacturer, color) {
        const sqlQuery = `INSERT INTO cars (licencePlate, manufacturer, color) VALUES ("${licencePlate}", "${manufacturer}", "${color}")`;
        await Database_1.Database.conn.query(sqlQuery);
    }
    async getCar(licencePlate) {
        const sqlQuery = `SELECT * FROM cars WHERE licencePlate = "${licencePlate}"`;
        const [rows] = await Database_1.Database.conn.query(sqlQuery);
        if (rows.length > 0) {
            const { licencePlate, manufacturer, color } = rows[0];
            return { licencePlate, manufacturer, color };
        }
        return null;
    }
    async removeCar(licencePlate) {
        const sqlQuery = `DELETE FROM cars WHERE licencePlate = "${licencePlate}"`;
        await Database_1.Database.conn.query(sqlQuery);
    }
}
exports.CarManager = CarManager;
//# sourceMappingURL=CarManager.js.map