"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
exports.port = 3000;
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: false }));
exports.app.use(body_parser_1.default.json());
exports.app.set("views", path_1.default.join(__dirname, "../views"));
exports.app.set("view engine", "pug");
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
exports.app.listen(3000, function () {
    console.log("server running");
});
//# sourceMappingURL=App.js.map