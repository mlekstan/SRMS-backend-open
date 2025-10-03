import { ObjectLiteral } from "typeorm";


export function copyToRow<Entity extends ObjectLiteral>(row: Entity, dict: object) {
  
  function traverseDict(dict: object) {
    Object.keys(dict).forEach((key) => {
      if (typeof dict[key] === "object" && dict[key] !== null && !Array.isArray(dict[key])) {
        traverseDict(dict[key]);
      } else {
        if (key in row) {
          row[key as keyof Entity]= dict[key];
        } 
        // else {
        //   throw Error(`There is no such column ${key} in table.`)
        // }
      }
    })
  }

  traverseDict(dict);
}