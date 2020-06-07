import Knex from "knex"

export const getOptionalConditions = (conditionsObject: any, knex: Knex) => {
    let conditions: any = {...knex}

    for (const prop in conditionsObject) {
        let toPush = conditions

        if (conditionsObject[prop] instanceof Array && conditionsObject[prop].length > 0) {
            toPush = conditions.whereIn(prop, conditionsObject[prop])
        }

        if (conditionsObject[prop]) {
            toPush = conditions.where(prop, conditionsObject[prop])
        }
        
        conditions = toPush
    }

    return conditions
}