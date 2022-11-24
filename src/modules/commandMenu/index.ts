import {createTable, showTable, showTables, deleteTable} from '../tables'

export const acceptableCommands = ['showTable','showTables','createTable', 'deleteTable'];

export const commandMenu = () => {
    let argList: string[] = process.argv;
    /* Remove two first arguments */
    argList.shift()
    argList.shift()

    const argumentsObj = argList.join(' ').split("--").filter((i) => i.length !== 0).map((i) => i.trim()).map((i) => ({[i.split(' ')[0]]: i.split(' ')[1]}) )
        
    argumentsObj.map((i) => Object.keys(i)[0]).map((command) => {
       
        if(acceptableCommands.includes(command)) {
            /* Correct command from list*/
            const commandValue =  Object.values(argumentsObj.filter((i) => Object.keys(i)[0] == command)[0])[0]

            switch (command) {
                case 'showTable':
                    showTable(commandValue)
                    break;

                case 'showTables':
                    showTables();
                    break;

                case 'createTable' :
                    createTable(commandValue)
                    break;

                case 'deleteTable':
                    deleteTable(commandValue);
                    break;
            }
        }
    })

       
    



}