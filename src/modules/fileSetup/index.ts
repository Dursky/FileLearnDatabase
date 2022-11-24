import fs from "fs";
import { uuid } from "uuidv4";
import {databaseStructure} from "../../types"

export const databaseBlueprint: databaseStructure= {
    id: uuid(),
    databaseName: `${process.env.DATABASE_NAME}-${uuid()}`,
    tables: []
}

export const initializeDatabaseFile = async () => {

    /* Create empty file or just open */
   // if (process.env.FILE_NAME)   fs.open(process.env.FILE_NAME as string,'w',() => {
        fs.readFile(process.env.FILE_NAME as string, 'utf-8', (err, readedData) => {
            console.log("Reading database file...")

            if (!readedData) fs.writeFile(process.env.FILE_NAME as string,'', (err) => console.log({err}))

            /* Initial check if file contain any string data */
            let parsedData: databaseStructure = readedData.length > 0 ? JSON.parse(readedData) : databaseBlueprint;


            /* Validate parsed data - if not correct - just fix it*/
            if (!parsedData.id || !parsedData.databaseName || parsedData.id.length == 0 || parsedData.databaseName.length == 0){
                /* File exist, but doesn't have property content */
                if (!parsedData.id || parsedData.id.length == 0) parsedData.id = databaseBlueprint.id
                if (!parsedData.databaseName || parsedData.databaseName.length == 0) parsedData.databaseName = databaseBlueprint.databaseName
            }

            if (err) {
              console.error({err});
              return -1
            } 

            /* If everything works fine - just write current data into file*/
            fs.writeFile(process.env.FILE_NAME as string, JSON.stringify(parsedData), (err) => err && console.log({err}))
          })
   // })
  //  else throw 'Check FILE_NAME in .env'
}
    