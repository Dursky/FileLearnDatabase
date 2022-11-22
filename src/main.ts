import * as dotenv from "dotenv";
import {initializeDatabaseFile} from './modules/fileSetup'
import {commandMenu} from './modules/commandMenu'
dotenv.config();

console.log(`FileLearnDatabase version: ${process.env.APP_VERSION}`);

/* Startup sequence */
console.log('Startup sequence started...')
initializeDatabaseFile();
commandMenu();
