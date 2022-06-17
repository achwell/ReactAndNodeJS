import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "node_admin",
    password: "node_admin",
    database: "node_admin",
    synchronize: true,
    logging: false,
    entities: ["src/entity/*.ts"],
    subscribers: [],
    migrations: [],
})