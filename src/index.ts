import { App } from "./app";

try {
	const app = new App();
	app.createExpressServer();
} catch (err) {
	console.log("Error during start express server", err);
}
