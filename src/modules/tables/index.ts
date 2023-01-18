import fs from "fs";
import {tableStructure, databaseStructure} from "../../types";
import {uuid} from "uuidv4";
import {areEqualArray} from "../../common";

export const createTable = async (tableName: string, tableSchema: string) => {
	/* Read current tables from file */

	fs.readFile(process.env.FILE_NAME as string, "utf-8", async (err, readedData) => {
		if (err) {
			console.error(err);
			return;
		}

		let tableSchemaProperty = {[tableSchema.split(":")[0]]: tableSchema.split(":")[1]};

		/* Multiple property in schema */
		if (tableSchema.includes(",")) {
			tableSchemaProperty = {};
			tableSchema
				.split(",")
				.map(
					(i) =>
						(tableSchemaProperty = {...tableSchemaProperty, [i.split(":")[0]]: i.split(":")[1]}),
				);
		}

		const parsedData: databaseStructure = JSON.parse(readedData);

		const newTable: tableStructure = {
			id: uuid(),
			tableName: tableName,
			tableSchema: tableSchemaProperty,
			tableChildren: [],
		};

		const contentToSave = {...parsedData, tables: parsedData.tables.concat(newTable)};

		fs.writeFileSync(process.env.FILE_NAME as string, JSON.stringify(contentToSave));

		console.log(`| Created table with name: ${tableName}`);
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

		console.log(`| Deleted table by id: ${id}`);
	});
};

export const addElementToTable = (tableId: string, fieldsWithValues: string) => {
	/*
		Example test command:
		--addElement c4b92817-ca26-4d45-882c-833dc9c4a96e firstName:test1,secondName:test2
		--addElement c4b92817-ca26-4d45-882c-833dc9c4a96e id:test1,name:test2
	*/
	try {
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
			if (!foundTableById) throw Error(`Not found table by id: ${tableId}`);

			const foundTableByIdSchema = Object.keys(foundTableById.tableSchema);

			let dataToInsertKeys = {[fieldsWithValues.split(":")[0]]: fieldsWithValues.split(":")[1]};

			/* Multiple property in schema */
			if (fieldsWithValues.includes(",")) {
				dataToInsertKeys = {};
				fieldsWithValues.split(",").map(
					(i) =>
						(dataToInsertKeys = {
							...dataToInsertKeys,
							[i.split(":")[0]]: i.split(":")[1],
						}),
				);
			}

			/* Warning message if we want to add something to id as a key */
			if (Object.keys(dataToInsertKeys).includes("id")) {
				console.log({
					message: "WARNING",
					data: "key 'id' will be ignore cause it is a reserved keyword",
				});
			}
			if (!areEqualArray(foundTableByIdSchema, Object.keys(dataToInsertKeys)))
				throw Error(
					`Provided not correct data in table schema: ${Object.keys(
						foundTableById.tableSchema,
					)} provided: ${dataToInsertKeys}`,
				);

			const elementToInsert = {...{id: uuid()}, ...dataToInsertKeys};
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

			console.log(`| Added element into table by id: ${tableId}`);
		});
	} catch (err) {
		console.error({message: "Found error", data: err});
	}
};

export const deleteElementFromTable = (tableId: string, removeBy: string) => {
	/*
		From which table, and what element:
		--removeElement 631e8499-e7a6-43f7-a4a5-ad7d3031fc49 user:smieszek
	*/
	fs.readFile(process.env.FILE_NAME as string, "utf-8", (err, readedData) => {
		if (err) {
			console.error(err);
			return;
		}
		const parsedData: databaseStructure = JSON.parse(readedData);
		const foundTableById = parsedData.tables.filter((i) => i.id === tableId)[0];

		foundTableById.tableChildren = foundTableById.tableChildren.filter((i: any) => {
			const splited = removeBy.split(":");
			return i[splited[0]] != splited[1];
		});

		const contentToSave = {
			...parsedData,
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

		console.log(`| Removed element from table by id: ${tableId}`);
	});
};

export const joinTables = (firstTableId: string, secondTableId: string) => {
	// --joinTables 284b0b66-4310-47f7-ac8c-c4b8dbb37270 70c85173-be0a-41e5-9504-2681c92f42e6
	fs.readFile(process.env.FILE_NAME as string, "utf-8", (err, readedData) => {
		if (err) {
			console.error(err);
			return;
		}
		const parsedData: databaseStructure = JSON.parse(readedData);

		const foundFirstTable = parsedData.tables.filter((i) => i.id === firstTableId)[0];
		const foundSecondTable = parsedData.tables.filter((i) => i.id === secondTableId)[0];

		const result = {
			joinedTables: `id: ${firstTableId}, id: ${secondTableId}`,
			tablesChildren: [...foundFirstTable.tableChildren, ...foundSecondTable.tableChildren],
		};

		console.log(result);
	});
};
