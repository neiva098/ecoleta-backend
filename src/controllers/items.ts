import { Item } from "../interfaces/item"
import knex from '../database/connections'
import { listItemsRepository } from "../repository/item"

export const listItems = async () => {
    const items = await listItemsRepository()

    return items.map((itemObject: Item) => {
        return {
            id: itemObject.id,
            name: itemObject.title,
            image_url: `${process.env.URL}/uploads/${itemObject.image}`
        }
    })
}