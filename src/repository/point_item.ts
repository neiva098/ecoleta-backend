import knex from '../database/connections'
import { Point } from '../interfaces/point'
import { insertPointRepository } from './point'
import { getOptionalConditions } from './general'

export const insertPointAndLinkItem = async (point: Point, items: number[]) => {
    const trx = await knex.transaction()

    const insertedIds = await insertPointRepository(point, trx)

    const point_id = insertedIds[0]

    const pointItems = items.map(item_id => {
        return {
            point_id,
            item_id
        }
    })

    const insertPointItem = await trx('point_items').insert(pointItems)

    await trx.commit()

    return {
        ...point,
        id: point_id
    }
}

export const joinPointItems = async (pointId: string) => {
    const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', pointId)
        .select('items.title')

    return items
}

export const joinPointsItems = async (city?: string, uf?: string, items?: number[]) => {
    const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .where(builder => {
            const conditions: any = { city, uf, 'point_items.item_id': items }

            for (const prop in conditions) {

                if (conditions[prop] instanceof Array && conditions[prop].length > 0) {
                    builder.whereIn(prop, conditions[prop])
                } else {
                    if (conditions[prop]) {
                        builder.where(prop, conditions[prop])
                    }
                } 
            }
        })
        .distinct()
        .select('points.*')

    return points
}