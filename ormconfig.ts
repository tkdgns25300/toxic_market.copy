import { DataSource } from "typeorm";
// import dotenv from "dotenv";
// dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 3000,
    entities: ["src/entity/**/*.{js,ts}"],
});
