import { Item } from "../interfaces/item"
import knex from '../database/connections'

export const listItems = async () => {
    const items = await knex('items').select('*')

    return items.map((itemObject: Item) => {
        return {
            name: itemObject.title,
            image_url: `${process.env.URL}/uploads/${itemObject.image}`
        }
    })
}