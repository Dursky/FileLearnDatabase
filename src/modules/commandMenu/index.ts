
//export type acceptableCommandsEnum = { 'showTables'|'createTables' ,'showTable'}

export const acceptableCommands = ['showTables','createTables','showTable'];

export const commandMenu = () => {
    let argList: string[] = process.argv;
    /* Remove two first arguments */
    argList.shift()
    argList.shift()

    if (argList[0] && argList[1]) {
        /* Check if key and value exist */
        const key = argList[0].replace('-','').replace('-','');
        if(acceptableCommands.includes(key)) {
            /* Correct command from list*/
            console.log({key})

            switch (key) {
                case 'showTables':
                    
            }
        }
       
    }

    console.log({argList})

}