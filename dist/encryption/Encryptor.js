"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.EncryptPasswordASync = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function EncryptPasswordASync(password) {
    const hash = await bcrypt_1.default.hash(password, 10);
    return hash;
}
exports.EncryptPasswordASync = EncryptPasswordASync;
async function comparePassword(password, hash, callback) {
    callback(await bcrypt_1.default.compare(password, hash));
}
exports.comparePassword = comparePassword;
//# sourceMappingURL=Encryptor.js.map