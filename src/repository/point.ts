import { Point } from '../interfaces/point'
import connection from '../database/connections'
import Knex from 'knex'
import { HttpError } from '../utils/errors'

export const insertPointRepository = async (point: Point, knex: Knex) => {
    return await knex('points').insert(point)
}

export const getPointRepository = (id: string) => {
    const point = connection('points').where('id', id).first()

    if (!point) throw new HttpError(400, 'A point with this id does not exists')

    return point
}