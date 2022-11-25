import * as readline from "node:readline/promises";
import {stdin as input} from "node:process";
import {createTable, showTable, showTables, deleteTable} from "../tables";
import {helpCommand} from "../../modules/helpCommand";

export const acceptableCommands = ["help", "showTable", "showTables", "createTable", "deleteTable"];

const rl = readline.createInterface({input});

export const commandMenu = async () => {
	console.log("Provide command: ");

	rl.on("line", (input) => {
		const argumentsObj = input
			.split("--")
			.filter((i) => i.length !== 0)
			.map((i) => i.trim())
			.map((i) => ({[i.split(" ")[0]]: i.split(" ")[1]}));

		argumentsObj
			.map((i) => Object.keys(i)[0])
			.map((command) => {
				const commandValue = Object.values(
					argumentsObj.filter((i) => Object.keys(i)[0] == command)[0],
				)[0];

				if (acceptableCommands.includes(command)) {
					/* Correct command from list*/

					switch (command) {
						case "help":
							helpCommand();
							break;
						case "showTable":
							showTable(commandValue);
							break;

						case "showTables":
							showTables();
							break;

						case "createTable":
							createTable(commandValue);
							break;

						case "deleteTable":
							deleteTable(commandValue);
							break;
					}
				} else {
					console.log({
						message: "Not recognized command, provided:",
						data: {command, commandValue},
					});
				}
			});
	});
};
