import fs from "fs"

export interface createTable {
    tableName: string
}

export const createTable = ({tableName} : createTable) => {
    /* Read current tables from file */

    fs.readFile(process.env.FILE_NAME as string, 'utf-8', (err, readedData) => {
        if (err) {
          console.error(err);
          return;
        }


        console.log({readedData});
      })
}