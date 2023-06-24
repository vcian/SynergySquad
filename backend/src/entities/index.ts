import path from "path";
import { DataSource } from "typeorm";
import { DBConfig } from "./db_config";

export const dataSource = new DataSource({
  type: "sqlite",
  database: `${path.resolve(__dirname, '../..')}/db/db_config.db`,
  entities: [DBConfig],
  synchronize: true
});
