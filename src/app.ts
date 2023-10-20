import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "../ormconfig";
import path from "path";
import { DataSource } from "typeorm";
import bodyParser from "body-parser";

export class App {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.setEnv();
		this.setDatabase();
		this.setMiddlewares();
	}

	// Set .env file
	private setEnv(): void {
		if (process.env.NODE_ENV === "development") {
			dotenv.config({
				path: path.join(__dirname, "../.env.development"),
			});
		} else if (process.env.NODE_ENV === "production") {
			dotenv.config({
				path: path.join(__dirname, "../.env.production"),
			});
		}
	}

	// Set Database Connect
	private setDatabase(): void {
		const AppDataSource = new DataSource({
			type: "mysql",
			host: process.env.DB_HOST,
			port: 3306,
			username: process.env.DB_USER_NAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			connectTimeout: 3000,
			entities: ["src/entity/**/*.{js,ts}"],
		});

		AppDataSource.initialize()
			.then(() => {
				console.log("Database Connected successfully");
			})
			.catch((err) => {
				console.error("Error during Database Connection", err);
			});
	}

	// Set Middlewares
	private setMiddlewares(): void {
		this.app.use(bodyParser.json({ limit: "20mb" }));
		this.app.use(bodyParser.urlencoded({ extended: false }));
	}

	// Start Express Server
	public async createExpressServer(): Promise<void> {
		try {
			this.app.listen(4000, () => {
				console.log("Server Start at 4000 port");
			});
		} catch (error) {
			console.log(error);
		}
	}
}
