import { Point } from '../interfaces/point'
import Knex from 'knex'

export const insertPointRepository = async (point: Point, knex: Knex) => {
    return await knex('points').insert(point)
}