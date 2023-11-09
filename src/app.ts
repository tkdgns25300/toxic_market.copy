import express from "express";
import dotenv from "dotenv";
import { getDataSource } from "../ormconfig";
import path from "path";
import bodyParser from "body-parser";
import { useExpressServer } from "routing-controllers";
import { routingControllerOptions } from "./util/routingConfig";
import Container from "typedi";
import { UserQueryRepo } from "./repository/user";
import { UserService } from "./service/user";
import { UserController } from "./controller/user";

Container.set("UserQueryRepo", new UserQueryRepo());
Container.set("UserService", new UserService());
Container.set("UserController", new UserController());

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
	private async setDatabase(): Promise<void> {
		try {
			const AppDataSource = getDataSource();
			AppDataSource.initialize()
				.then(() => {
					console.log("Database Connected successfully");
				})
				.catch((err) => {
					console.error("Error during Database Connection", err);
				});
			// await createConnection().then(() => {
			// 	console.log("DB Connected successfully");
			// });
		} catch (error) {
			console.log(error);
		}
	}

	// Set Middlewares
	private setMiddlewares(): void {
		this.app.use(bodyParser.json({ limit: "20mb" }));
		this.app.use(bodyParser.urlencoded({ extended: false }));
	}

	// Start Express Server
	public async createExpressServer(): Promise<void> {
		try {
			useExpressServer(this.app, routingControllerOptions);

			this.app.listen(4000, () => {
				console.log("Server Start at 4000 port");
			});
		} catch (error) {
			console.log(error);
		}
	}
}
