# FileLearnDatabase

Own implementation of database based on Node.js and Typescript, GUI made in React [HTML lib]

Command list:

- help
- showTables
- showTable
- deleteTable
- deleteElement
- joinTables

Description of command - use "--help" command in interface

```
help: 'Show list of command with description --help',
  showTables: 'Show all tables stored in database: --showTables',
  showTable: 'Show table by id: --showTable <id>',
  createTable: 'Create table by name: --createTable <tableProperties> <name>',
  deleteTable: 'Delete table by id: --deleteTable <id>',
  addElement: 'Add element into table: --addElement <tableId> <tableProperties>',
  deleteElement: 'Delete element from table: --deleteElement <tableId> <tableProperties>',
  joinTables: 'Join two tables by children: --joinTable <firstTableId> <secondTableId>'
```

Two mode of operation [webSocket communication with GUI] or [CLI]:

```
server or commandMenu
```
