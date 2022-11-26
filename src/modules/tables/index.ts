import fs from "fs";
import {tableStructure, databaseStructure} from "../../types";
import {uuid} from "uuidv4";

export const createTable = async (tableName: string, tableSchema: string) => {
	/* Read current tables from file */

	fs.readFile(process.env.FILE_NAME as string, "utf-8", async (err, readedData) => {
		if (err) {
			console.error(err);
			return;
		}

		const tableSchemaProperty = Object.assign({}, ...tableSchema);
		const parsedData: databaseStructure = JSON.parse(readedData);

		const newTable: tableStructure = {
			id: uuid(),
			tableName: tableName,
			tableSchema: tableSchemaProperty,
			tableChildren: [],
		};

		const contentToSave = {...parsedData, tables: parsedData.tables.concat(newTable)};

		fs.writeFileSync(process.env.FILE_NAME as string, JSON.stringify(contentToSave));

		console.log("| Created table");
	});
};

export const showTable = async (id: string) => {
	fs.readFile(process.env.FILE_NAME as string, "utf-8", (err, readedData) => {
		if (err) {
			console.error(err);
			return;
		}
		const parsedData: databaseStructure = JSON.parse(readedData);

		console.log(`| Show table by id: ${id}`);
		const foundTable = parsedData.tables.filter((i) => i.id === id)[0];
		console.log(foundTable ? foundTable : "NOT_FOUND");
	});
};

export const showTables = async () => {
	fs.readFile(process.env.FILE_NAME as string, "utf-8", (err, readedData) => {
		if (err) {
			console.error({err});
			return;
		}
		const parsedData: databaseStructure = JSON.parse(readedData);
		console.log(`| Show all tables`);
		console.log(parsedData.tables);
	});
};

export const deleteTable = async (id: string) => {
	fs.readFile(process.env.FILE_NAME as string, "utf-8", (err, readedData) => {
		if (err) {
			console.error(err);
			return;
		}
		const parsedData: databaseStructure = JSON.parse(readedData);

		const contentToSave = {...parsedData, tables: parsedData.tables.filter((i) => i.id !== id)};

		fs.writeFile(
			process.env.FILE_NAME as string,
			JSON.stringify(contentToSave),
			(err) => err && console.log({err}),
		);

		console.log("| Deleted table");
	});
};

export const addElementToTable = (tableId: string, fieldsWithValues: string) => {
	/*
		Example test command:
		--addElement c4b92817-ca26-4d45-882c-833dc9c4a96e firstName:test1,secondName:test2
		--addElement c4b92817-ca26-4d45-882c-833dc9c4a96e id:test1,name:test2
	*/
	fs.readFile(process.env.FILE_NAME as string, "utf-8", (err, readedData) => {
		if (err) {
			console.error(err);
			return;
		}
		const parsedData: databaseStructure = JSON.parse(readedData);
		/*
			Validate data with tableProperties
		*/

		const foundTableById = parsedData.tables.filter((i) => i.id === tableId)[0];

		const foundTableByIdKeys = Object.keys(foundTableById.tableSchema);
		const dataToInsertKeys = Object.keys(Object.assign({}, ...fieldsWithValues));

		/* Warning message if we want to add something to id place */
		if (dataToInsertKeys.includes("id")) {
			console.log({
				message: "WARNING",
				data: "key 'id' will be ignore cause it is a reserved keyword",
			});
		}

		//console.log(foundTableByIdKeys == dataToInsertKeys, foundTableByIdKeys, dataToInsertKeys);
		/* TODO: Need to compare two array, next check dataType from properties with input data*/

		const elementToInsert = {...{id: uuid()}, ...Object.assign({}, ...fieldsWithValues)};
		foundTableById.tableChildren = foundTableById.tableChildren.concat(elementToInsert);

		const contentToSave = {
			...parsedData,
			id: uuid(),
			tables: parsedData.tables.filter((i) => {
				if (i.id === foundTableById.id) {
					i = foundTableById;
					return i;
				}
				return i;
			}),
		};

		fs.writeFile(
			process.env.FILE_NAME as string,
			JSON.stringify(contentToSave),
			(err) => err && console.log({err}),
		);

		console.log("| Added element into table");
	});
};
