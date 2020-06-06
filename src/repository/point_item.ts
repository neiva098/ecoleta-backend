import knex from '../database/connections'
import { Point } from '../interfaces/point'
import { insertPointRepository } from './point'

export const insertPointAndLinkItem = async (point: Point, items: number[]) => {
    // const trx = await knex.transaction() not working in my node version

    const insertedIds = await insertPointRepository(point, knex)

    const point_id = insertedIds[0]

    const pointItems = items.map(item_id => {
        return {
            point_id,
            item_id
        }
    })

    const insertPointItem = await knex('point_items').insert(pointItems)

    return {
        ...point,
        id: point_id
    }
}