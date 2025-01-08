import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "1004344985mauu",
  port: 5423,
  database: "blog-typeorm",
  entities: [],
  synchronize: true,
  logging: true,
  subscribers: [],
  migrations: [],
});
