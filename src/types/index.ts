export interface tableChild {
	/* TODO: Create dynamic schema*/
}
export interface tableSchema {
	[key: string]: string;
}

export interface tableStructure {
	id: string;
	tableName: string;
	tableChildren: tableChild[];
	tableSchema: tableSchema;
}

export interface databaseStructure {
	id: string;
	databaseName: string;
	tables: tableStructure[];
}
