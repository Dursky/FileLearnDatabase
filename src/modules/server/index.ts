import {Server, Socket} from "socket.io";
import {createServer} from "http";
import {argumentsList} from "../../modules/arguments";
import {acceptableCommands} from "../commandMenu";
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

export const server = async () => {
	const httpServer = createServer();
	const io = new Server(httpServer, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	});

	console.log("-> Starting websocket server");
	io.on("connection", (socket: Socket) => {
		console.log(`-> New connection id: ${socket.id}`);
		socket.on("main", async (data) => {
			/* Get online response from command menu */
			const typedArguments = argumentsList(data);

			typedArguments.map(async (command) => {
				let socketResponse: any = "";
				const commandKey = command[0] as string;
				const firstArgumentValue = command[1] as string;
				const secondArgumentValue = command[2] as string;

				socket.emit("main", {mode: "debug", commandKey, firstArgumentValue, secondArgumentValue});
				/* TODO: Get a multiple value for command */
				if (acceptableCommands.includes(commandKey)) {
					/* Correct command from list*/

					switch (commandKey) {
						case "help":
							helpCommand(socket);
							break;
						case "showTable":
							showTable(firstArgumentValue, socket);
							break;

						case "showTables":
							showTables(socket);
							break;

						case "createTable":
							/*
							For createTable will be array contain objects
						    */
							createTable(secondArgumentValue, firstArgumentValue, socket);
							break;

						case "deleteTable":
							deleteTable(firstArgumentValue, socket);
							break;

						case "addElement":
							addElementToTable(firstArgumentValue, secondArgumentValue, socket);

						case "deleteElement":
							deleteElementFromTable(firstArgumentValue, secondArgumentValue, socket);

						case "joinTables":
							joinTables(firstArgumentValue, secondArgumentValue, socket);
					}
				} else {
					console.log({
						message: "Not recognized command, provided:",
						data: {command, commandKey, firstArgumentValue, secondArgumentValue},
					});
				}
				console.log("socketResponse", socketResponse);
				socket.emit("main", socketResponse);
			});
		});
	});

	httpServer.listen(process.env.SERVER_PORT, () => {
		console.log(`Example app listening on port ${process.env.SERVER_PORT}`);
	});
};
