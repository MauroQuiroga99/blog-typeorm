import { DataSource } from "typeorm";
import entities from "../entities";
import dotenv from "dotenv";

dotenv.config();

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
  migrations: ["src/database/migrations/*.ts"],
});

appDataSource.initialize();
export default appDataSource;
