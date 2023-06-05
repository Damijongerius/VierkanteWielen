"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mysql_1 = __importDefault(require("mysql"));
const Logger_1 = require("../Logger");
const logger = new Logger_1.Logger("databaseErr.txt");
class Database {
    static connect(host, user, password, database) {
        Database.conn = mysql_1.default.createConnection({
            host: host,
            user: user,
            password: password,
            database: database,
        });
        Database.conn.connect(function (err) {
            if (err)
                throw err;
            console.log("Connected To DataBase!");
        });
    }
    static async query(sqlQuery) {
        await this.conn.query(sqlQuery, (err, result) => {
            return err ? Database.reject(err) : result.insertId;
        });
    }
    static reject(error) {
        logger.log(error);
        return false;
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map