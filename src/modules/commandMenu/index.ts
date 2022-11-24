
//export type acceptableCommandsEnum = { 'showTables'|'createTables' ,'showTable'}

export const acceptableCommands = ['showTable','showTables','createTable'];

export const commandMenu = () => {
    let argList: string[] = process.argv;
    /* Remove two first arguments */
    argList.shift()
    argList.shift()

    if (argList[0] && argList[1]) {
        /* Check if key and value exist */
        const value = argList[1];

        const argumentsObj = argList.join(' ').split("--").filter((i) => i.length !== 0).map((i) => i.trim()).map((i) => ({[i.split(' ')[0]]: i.split(' ')[1]}) )

        
       argumentsObj.map((i) => Object.keys(i)[0]).map((command) => {
       
        if(acceptableCommands.includes(command)) {
            /* Correct command from list*/
            const commandValue =  Object.values(argumentsObj.filter((i) => Object.keys(i)[0] == command)[0])[0]

            switch (command) {
                case 'showTable':
                    console.log('showTable',commandValue);
                    break;

                case 'showTables':
                    console.log( 'showTables', commandValue)
                    break;

                case 'createTable' :
                    console.log('createTable', commandValue)
                    break;
            }
        }
    })

       
    }



}