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
exports.CarManager = void 0;
const Database_js_1 = require("./Database.js");
class CarManager {
    addCar(licencePlate, manufacturer, color) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `INSERT INTO cars (licencePlate, manufacturer, color) VALUES ("${licencePlate}", "${manufacturer}", "${color}")`;
            yield Database_js_1.Database.conn.query(sqlQuery);
        });
    }
    getCar(licencePlate) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `SELECT * FROM cars WHERE licencePlate = "${licencePlate}"`;
            const [rows] = yield Database_js_1.Database.conn.query(sqlQuery);
            if (rows.length > 0) {
                const { licencePlate, manufacturer, color } = rows[0];
                return { licencePlate, manufacturer, color };
            }
            return null;
        });
    }
    getCars() {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `SELECT * FROM cars`;
            const rows = yield Database_js_1.Database.conn.query(sqlQuery);
            if (rows.length > 0) {
                return rows;
            }
        });
    }
    removeCar(licencePlate) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqlQuery = `DELETE FROM cars WHERE licencePlate = "${licencePlate}"`;
            yield Database_js_1.Database.conn.query(sqlQuery);
        });
    }
}
exports.CarManager = CarManager;
//# sourceMappingURL=CarManager.js.map