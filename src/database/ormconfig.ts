import { DataSource } from "typeorm";
import entities from "../entities";
import dotenv from "dotenv";

dotenv.config();

export const isProduction = process.env.NODE_ENV === "staging";

const appDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: entities, // o entities,
  synchronize: false,
  logging: true,
  subscribers: [],
  migrations: !isProduction
    ? ["src/database/migrations/*.ts"]
    : ["dist/database/migrations/*.js"],
});

appDataSource.initialize();
export default appDataSource;
