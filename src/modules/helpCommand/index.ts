import {Socket} from "socket.io";

export const helpCommand = (socket?: Socket) => {
	const commandList = {
		help: "Show list of command with description --help",
		showTables: "Show all tables stored in database: --showTables",
		showTable: "Show table by id: --showTable <id>",
		createTable: "Create table by name: --createTable <tableProperties> <name>",
		deleteTable: "Delete table by id: --deleteTable <id>",
		addElement: "Add element into table: --addElement <tableId> <tableProperties>",
		deleteElement: "Delete element from table: --deleteElement <tableId> <tableProperties>",
		joinTables: "Join two tables by children: --joinTable <firstTableId> <secondTableId>",
	};

	const commandProperties = {
		tableProperties: "Everything must be write without whitespace example: id:number,name:string",
		"addElement/deleteElement": "{field:value} must be equal with tableProperties type",
	};

	console.log(commandList, commandProperties);
	socket?.emit("main", {commandList, commandProperties});
	return {commandList, commandProperties};
};
