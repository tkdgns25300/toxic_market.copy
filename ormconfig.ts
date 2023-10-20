import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.DB_HOST,
	port: 3306,
	username: process.env.DB_USER_NAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	connectTimeout: 3000,
	entities: ["src/entity/**/*.{js,ts}"],
});
