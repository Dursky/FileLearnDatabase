import * as readline from "node:readline/promises";
import {stdin as input} from "node:process";
import {
	createTable,
	showTable,
	showTables,
	deleteTable,
	addElementToTable,
	deleteElementFromTable,
	joinTables,
} from "../tables";
import {helpCommand} from "../../modules/helpCommand";

const DEBBUGING_MODE = true;

export const acceptableCommands = [
	"help",
	"showTable",
	"showTables",
	"createTable",
	"deleteTable",
	"addElement",
	"deleteElement",
	"joinTables",
];

const rl = readline.createInterface({input, terminal: true, output: process.stdout});

export const commandMenu = async () => {
	console.log("Provide command: ");
	/*
		Test command with 3 arguments and 3 values:
		--createTable id:number,name:string test1 --showTables --showTable 288897c7-636b-401d-99f0-1552489c21d7
	*/

	rl.on("line", (input) => {
		const inputArgumentList = input
			.split("--")
			.map((i) => i.trim().replace(/--/i, ""))
			.filter((i) => i.length !== 0)
			.map((i) => {
				if (i.includes(" ")) {
					const withSemiclone = i.split(" ").map((i) => {
						console.log(i);
						//TODO: Get : or , from command

						/*
							Case 1. name:test,test:test - multiple arguments
							Case 2. name:test - single argument
						*/

						switch (i) {
							/* 
								For multiple arguments: xxx:yyy,yyy:xxx 
							*/
							case ",":
								return i.split(",").map((k) => ({[k.split(":")[0]]: k.split(":")[1]}));

							/*
								For single argument: xxx:yyy
							*/
							case ":":
								return {[i.split(":")[0]]: i.split(":")[1]};

							/*
								If not found arguments - just return the same data
							*/
							default:
								return i;
						}
					});

					return withSemiclone;
				}
				return [i];
			});

		inputArgumentList.map((command) => {
			const commandKey = command[0] as string;
			DEBBUGING_MODE && console.log("commandKey", commandKey);

			const firstArgumentValue = command[1] as string;
			const secondArgumentValue = command[2] as string;
			DEBBUGING_MODE &&
				console.log("Argument first: ", firstArgumentValue, " second: ", secondArgumentValue);

			/* TODO: Get a multiple value for command */
			if (acceptableCommands.includes(commandKey)) {
				/* Correct command from list*/
				switch (commandKey) {
					case "help":
						helpCommand();
						break;
					case "showTable":
						showTable(firstArgumentValue);
						break;

					case "showTables":
						showTables();
						break;

					case "createTable":
						/*
							For createTable will be array contain objects
						*/
						createTable(secondArgumentValue, firstArgumentValue);
						break;

					case "deleteTable":
						deleteTable(firstArgumentValue);
						break;

					case "addElement":
						addElementToTable(firstArgumentValue, secondArgumentValue);

					case "deleteElement":
						deleteElementFromTable(firstArgumentValue, secondArgumentValue);

					case "joinTables":
						joinTables(firstArgumentValue, secondArgumentValue);
				}
			} else {
				console.log({
					message: "Not recognized command, provided:",
					data: {command, commandKey, firstArgumentValue, secondArgumentValue},
				});
			}
		});
	});
};
