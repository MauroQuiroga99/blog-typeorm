import { DataSource } from "typeorm";
import entities from "../entities";

const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "1004344985mauu",
  port: 5423,
  database: "blog-typeorm",
  entities: entities, // o entities, sin el value
  synchronize: false,
  logging: true,
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
});

appDataSource.initialize();
export default appDataSource;
