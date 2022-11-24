export interface tableChild {
    id: string
    content: string
    /* TODO: Create dynamic schema*/
}

export interface tableStructure {
    id: string
    tableName: string
    tableChildren: tableChild[]
}

export interface databaseStructure {
    id: string
    databaseName: string
    tables: tableStructure[]
}