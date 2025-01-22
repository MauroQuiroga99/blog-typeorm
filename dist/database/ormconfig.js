"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProduction = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = __importDefault(require("../entities"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.isProduction = process.env.NODE_ENV === "production";
const appDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: entities_1.default, // o entities,
    synchronize: false,
    logging: true,
    subscribers: [],
    migrations: !exports.isProduction
        ? ["src/database/migrations/.ts"]
        : ["dist/database/migrations/.js"],
});
appDataSource.initialize();
exports.default = appDataSource;
