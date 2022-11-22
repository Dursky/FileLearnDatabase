export interface tableObjectsStructure {
    id: string
    content: string
    /* TODO: Create dynamic schema*/
}

export interface tableStructure {
    id: string
    tableName: string
    tableObjects: tableObjectsStructure[]
}

export interface databaseStructure {
    id: string
    databaseName: string
    tables: tableStructure[]
}