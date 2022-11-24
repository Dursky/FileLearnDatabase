import fs from "fs";
import {uuid} from "uuidv4";
import {databaseStructure} from "../../types";

export const databaseBlueprint: databaseStructure = {
	id: uuid(),
	databaseName: `${process.env.DATABASE_NAME}-${uuid()}`,
	tables: [],
};

export const initializeDatabaseFile = () => {
	/* Check if file exist - if not just create a new one with blueprint as content */
	fs.access(process.env.FILE_NAME as string, fs.constants.F_OK, (err) => {
		if (err) {
			fs.writeFile(
				process.env.FILE_NAME as string,
				JSON.stringify(databaseBlueprint),
				(err) => err && console.error({err}),
			);
			console.log("-> Setup database file complete");
		} else {
			console.log("-> Setuping database file...");
			fs.readFile(process.env.FILE_NAME as string, "utf-8", (err, readedData) => {
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

				/* If everything is correct - just save any changes into file */
				fs.writeFile(
					process.env.FILE_NAME as string,
					JSON.stringify(parsedData),
					(err) => err && console.error(err),
				);
				console.log("-> Setup database file complete");
			});
		}
	});
};
