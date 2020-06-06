import { Point } from '../interfaces/point'
import { insertPointAndLinkItem } from '../repository/point_item'

export const insertPoint = async (point: Point, items: number[]) => {
    point.image = point.image || ''

    return await insertPointAndLinkItem(point, items)
}