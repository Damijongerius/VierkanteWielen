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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mysql_1 = __importDefault(require("mysql"));
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
    static query(sqlQuery, values) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (values === undefined) {
                    this.conn.query(sqlQuery, (err, result) => {
                        if (err) {
                            reject(Database.reject(err));
                        }
                        else {
                            resolve(result);
                        }
                    });
                }
                else {
                    this.conn.query(sqlQuery, values, (err, result) => {
                        if (err) {
                            reject(Database.reject(err));
                        }
                        else {
                            resolve(result);
                        }
                    });
                }
            });
        });
    }
    static reject(error) {
        console.log(error);
        return false;
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map