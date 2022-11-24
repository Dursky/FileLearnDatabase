import fs from "fs"
import { tableStructure, databaseStructure} from '../../types'
import { uuid } from "uuidv4"

export const createTable = (tableName : string) => {
    /* Read current tables from file */

    fs.readFile(process.env.FILE_NAME as string, 'utf-8', (err, readedData) => {
        if (err) {
          console.error(err);
          return;
        }
        const parsedData: databaseStructure = JSON.parse(readedData);
        const newTable: tableStructure = {id: uuid(), tableName: tableName, tableChildren:[] }
        const contentToSave ={ ...parsedData, tables: parsedData.tables.concat(newTable)}

        fs.writeFile(process.env.FILE_NAME as string, JSON.stringify(contentToSave), (err) => err && console.log({err}))
      })

}

export const showTable = (id: string) => {
    fs.readFile(process.env.FILE_NAME as string, 'utf-8', (err, readedData) => {
        if (err) {
          console.error(err);
          return;
        }
        const parsedData: databaseStructure = JSON.parse(readedData);
        
        console.log(parsedData.tables.filter((i) => i.id === id)[0])
      })
}

export const showTables = () => {
    fs.readFile(process.env.FILE_NAME as string, 'utf-8', (err, readedData) => {
        if (err) {
          console.error({err});
          return;
        }
        const parsedData: databaseStructure = JSON.parse(readedData);
        
       console.log(parsedData.tables)
      })
}

export const deleteTable = (id: string) => {
    fs.readFile(process.env.FILE_NAME as string, 'utf-8', (err, readedData) => {
        if (err) {
          console.error(err);
          return;
        }
        const parsedData: databaseStructure = JSON.parse(readedData);
        console.log(parsedData.tables.filter((i) => i.id))
        const contentToSave ={ ...parsedData, tables: parsedData.tables.filter((i) => i.id !== id)}

        fs.writeFile(process.env.FILE_NAME as string, JSON.stringify(contentToSave), (err) => err && console.log({err}))
      })
}

