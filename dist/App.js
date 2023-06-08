"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisStore = exports.redisClient = exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
exports.port = 3000;
//Configure redis client
exports.redisClient = (0, redis_1.createClient)({ url: 'redis://localhost:6379' });
exports.redisClient.connect().catch(console.error);
// @ts-ignore
exports.redisStore = new connect_redis_1.default({
    // @ts-ignore
    client: exports.redisClient,
    prefix: "servertje",
});
exports.app.use((0, express_session_1.default)({
    secret: 'superSecrete',
    resave: false,
    saveUninitialized: true,
    store: exports.redisStore,
    cookie: {
        secure: false,
        maxAge: 3600000,
    },
}));
exports.app.use(body_parser_1.default.urlencoded({ extended: false }));
exports.app.use(body_parser_1.default.json());
exports.app.use((0, express_session_1.default)({
    secret: "blbbblsdf",
    store: exports.redisStore,
}));
exports.redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
exports.redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
exports.app.set("views", path_1.default.join(__dirname, "../views"));
exports.app.set("view engine", "pug");
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
exports.app.listen(exports.port, function () {
    console.log("Server running on port " + exports.port);
});
//# sourceMappingURL=App.js.map