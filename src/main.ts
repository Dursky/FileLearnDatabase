import * as dotenv from "dotenv";
import {initializeDatabaseFile} from "./modules/fileSetup";
import {commandMenu} from "./modules/commandMenu";
import {server} from "./modules/server";

dotenv.config();

console.log(`-> FileLearnDatabase version: ${process.env.APP_VERSION}`);

/* Startup sequence */
console.log("-> Startup sequence started...");
initializeDatabaseFile();
if (process.env.MODE === "commandMenu") commandMenu();

switch (process.env.MODE) {
	case "commandMenu":
		commandMenu();
		break;
	case "server":
		server();
		break;
}
