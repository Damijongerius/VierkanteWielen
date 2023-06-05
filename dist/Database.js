"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mysql_1 = __importDefault(require("mysql"));
class Database {
    constructor(host, user, password, database) {
        this.conn = mysql_1.default.createConnection({
            host: host,
            user: user,
            password: password,
            database: database,
        });
        this.conn.connect(function (err) {
            if (err)
                throw err;
            console.log("Connected To DataBase!");
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map