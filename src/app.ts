import express from "express";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { AppDataSource } from "../ormconfig";

export class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.setEnv();
        this.setDatabase();
        this.setMiddlewares();
    }

    // Set Database Connect
    private setDatabase(): void {
        AppDataSource.initialize()
            .then(() => {
                console.log("Data Source has been initialized");
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err);
            });
    }

    // Set Middlewares
    private setMiddlewares(): void {}

    // Set .env file
    private setEnv(): void {
        if (process.env.NODE_ENV === "development") {
            dotenv.config({
                path: "../.env.development",
            });
        } else if (process.env.NODE_ENV === "production") {
            dotenv.config({
                path: "../.env.production",
            });
        }
    }
}

// setEnv 함수 먼저 작성해야 DB연결 시 환경변수 사용 가능.
