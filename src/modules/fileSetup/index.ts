import fs from "fs";
import {uuid} from "uuidv4";
import {databaseStructure} from "../../types";

export const databaseBlueprint: databaseStructure = {
	id: uuid(),
	databaseName: `${process.env.DATABASE_NAME}-${uuid()}`,
	tables: [],
};

export const initializeDatabaseFile = () => {
	try {
		console.log("-> Reading database file...");
		fs.accessSync(process.env.FILE_NAME as string, fs.constants.F_OK);
		const readedData = fs.readFileSync(process.env.FILE_NAME as string, "utf-8");

		/* Initial check if file contain any string data */
		let parsedData: databaseStructure =
			readedData.length > 0 ? JSON.parse(readedData) : databaseBlueprint;

		/* Validate parsed data - if not correct - just fix it*/
		if (
			!parsedData.id ||
			!parsedData.databaseName ||
			parsedData.id.length == 0 ||
			parsedData.databaseName.length == 0
		) {
			/* File exist, but doesn't have property content */
			if (!parsedData.id || parsedData.id.length == 0) parsedData.id = databaseBlueprint.id;
			if (!parsedData.databaseName || parsedData.databaseName.length == 0)
				parsedData.databaseName = databaseBlueprint.databaseName;
		}

		fs.writeFileSync(process.env.FILE_NAME as string, JSON.stringify(parsedData));
		console.log("-> Read database file complete");
	} catch (err) {
		fs.writeFileSync(process.env.FILE_NAME as string, JSON.stringify(databaseBlueprint));
	}
};
