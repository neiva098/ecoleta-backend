import { Point } from '../interfaces/point'
import { insertPointAndLinkItem, joinPointItems } from '../repository/point_item'
import { getPointRepository } from '../repository/point'

export const insertPoint = async (point: Point, items: number[]) => {
    point.image = point.image || ''

    return await insertPointAndLinkItem(point, items)
}

export const getPoint = async (pointId: string) => {
    const point = await getPointRepository(pointId)

    const items = await joinPointItems(pointId)

    return { point, items }
}