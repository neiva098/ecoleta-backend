import knex from '../database/connections'
import { Point } from '../interfaces/point'

export const insertPointAndLinkItem = async (point: Point, items: number[]) => {
    const trx = await knex.transaction()

    const insertedIds = await trx('points').insert(point)

    const pointItems = items.map(item => {
        return {
            point_id: insertedIds[0],
            item_id: item
        }
    })

    const insertPointItem = await trx('point_items').insert(pointItems)
    
    return insertPointItem
}