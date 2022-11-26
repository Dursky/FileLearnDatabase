export const helpCommand = () => {
	const commandList = {
		help: "Show list of command with description --help",
		showTables: "Show all tables stored in database: --showTables",
		showTable: "Show table by id: --showTable <id>",
		createTable: "Create table by name: --createTable <tableProperties> <name>",
		deleteTable: "Delete table by id: --deleteTable <id>",
		addElement: "Add element into table: --addElement <tableId> <field:value>",
	};

	const commandProperties = {
		tableProperties: "Everything must be write without whitespace example: id:number,name:string",
		addElement: "{field:value} must be equal with tableProperties type",
	};

	console.log(commandList, commandProperties);
};
