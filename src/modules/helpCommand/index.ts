export const helpCommand = () => {
	const commandList = {
		help: "Show list of command with description --help",
		showTables: "Show all tables stored in database: --showTables",
		showTable: "Show table by id: --showTable <id>",
		createTable: "Create table by name: --createTable <name>",
		deleteTable: "Delete table by id: --deleteTable <id>",
	};

	console.log(commandList);
};
